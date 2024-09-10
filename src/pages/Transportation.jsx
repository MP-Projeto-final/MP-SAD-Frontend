import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import jsQR from 'jsqr'
import { Camera, Upload, Package } from 'lucide-react'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`

const Section = styled.section`
  width: 100%;
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  color: #444;
  margin-bottom: 1rem;
`

const QRScannerContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 1rem;
  position: relative;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Canvas = styled.canvas`
  display: none;
`

const PackageInfo = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`

const StatusSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`

const ImageUploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  border: 2px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`

export default function PackageUpdate() {
  const [packageId, setPackageId] = useState('')
  const [status, setStatus] = useState('')
  const [images, setImages] = useState([])
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        videoRef.current.srcObject = stream
        videoRef.current.play()
        requestAnimationFrame(tick)
      } catch (error) {
        console.error('Error accessing camera:', error)
      }
    }

    startCamera()

    return () => {
      const stream = videoRef.current?.srcObject
      stream?.getTracks().forEach(track => track.stop())
    }
  }, [])

  const tick = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.height = video.videoHeight
      canvas.width = video.videoWidth
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      
      if (code) {
        setPackageId(code.data)
      } else {
        requestAnimationFrame(tick)
      }
    } else {
      requestAnimationFrame(tick)
    }
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages([...images, reader.result])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Submitting:', { packageId, status, images })
    // Reset form after submission
    setPackageId('')
    setStatus('')
    setImages([])
  }

  return (
    <PageContainer>
      <Title>Package Update</Title>

      <Section>
        <SectionTitle>Scan QR Code</SectionTitle>
        <QRScannerContainer>
          <Video ref={videoRef} />
          <Canvas ref={canvasRef} />
        </QRScannerContainer>
      </Section>

      {packageId && (
        <>
          <Section>
            <SectionTitle>Package Information</SectionTitle>
            <PackageInfo>
              <Package size={24} />
              <p>Package ID: {packageId}</p>
            </PackageInfo>
          </Section>

          <Section>
            <SectionTitle>Update Status</SectionTitle>
            <StatusSelect value={status} onChange={handleStatusChange}>
              <option value="">Select status</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="failed_delivery">Failed Delivery</option>
            </StatusSelect>
          </Section>

          <Section>
            <SectionTitle>Upload Images</SectionTitle>
            <ImageUploadContainer>
              {images.map((image, index) => (
                <ImagePreview key={index} src={image} alt={`Upload ${index + 1}`} />
              ))}
              <UploadButton onClick={() => fileInputRef.current.click()}>
                <Upload size={24} />
              </UploadButton>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
            </ImageUploadContainer>
          </Section>

          <SubmitButton onClick={handleSubmit}>Update Package</SubmitButton>
        </>
      )}
    </PageContainer>
  )
}