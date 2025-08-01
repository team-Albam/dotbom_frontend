import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import axiosInstance from "../api/axiosInstance";
import { useSettings } from "../contexts/SettingsContext";

const ViewerContainer = styled.div`
  height: 100vh;
  background: linear-gradient(
    135deg,
    #ffe4e1 0%,
    #fff8dc 25%,
    #ffffff 50%,
    #f0f8ff 75%,
    #e6e6fa 100%
  );
  padding-top: 70px;
  overflow: hidden;
`;

const ViewerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  height: calc(100vh - 70px);
  overflow: hidden;
`;

const ViewerTools = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 40px;
  align-items: start;
`;

const LeftSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FileStatusDisplay = styled.div`
  padding: 12px 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background: white;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 20px;
  flex-shrink: 0;
`;

const ToolSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ToolTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
`;

const FileInput = styled.input`
  display: none;
`;

const FileName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  margin-left: auto;

  &:hover {
    color: #666;
  }
`;

const DropZone = styled.div`
  width: 100%;
  min-height: 200px;
  border: 2px dashed #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #4682b4;
  }
`;

const DropZoneIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 15px;
`;

const DropZoneText = styled.p`
  color: #666;
  font-size: 16px;
  text-align: center;
  margin: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
`;

const LoadingIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: #4682b4;
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  color: #4682b4;
  font-size: 14px;
  font-weight: 600;
`;

const RightSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ConversionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  flex-shrink: 0;
`;

const ConversionButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${(props) => (props.$active ? "#4682B4" : "#ddd")};
  border-radius: 20px;
  background: ${(props) => (props.$active ? "#f0f8ff" : "white")};
  color: ${(props) => (props.$active ? "#4682B4" : "#333")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.$active ? "#e6f3ff" : "#f8f9fa")};
  }
`;

// const ResultDisplay = styled.div`
//   background: white;
//   border: 1px solid #ddd;
//   border-radius: 10px;
//   padding: 15px;
//   min-height: 200px;
//   font-size: 16px;
//   line-height: 1.6;
//   color: #333;
//   display: flex;
//   align-items: flex-start;
//   justify-content: flex-start;
//   overflow-y: auto;
//   white-space: pre-wrap;
//   word-wrap: break-word;
// `;

const UploadedFileDisplay = styled.div`
  background: white;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const FileContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;

const PDFPreview = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  background: white;
`;

const PDFFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #ddd;
`;

const PDFIcon = styled.div`
  font-size: 48px;
  color: #dc3545;
  margin-bottom: 10px;
`;

const PDFText = styled.div`
  color: #666;
  font-size: 14px;
  text-align: center;
`;


const ResultDisplay = styled.div<{
  $bgColor: string;
  $fontSize: string;
  $textColor: string;
  $width: string;
  $letterSpacing: string;
}>`
  background-color: ${(props) => props.$bgColor};
  font-size: ${(props) => props.$fontSize};
  color: ${(props) => props.$textColor};
  max-width: ${(props) => props.$width};
  letter-spacing: ${(props) => props.$letterSpacing};
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  min-height: 200px;
  line-height: 1.6;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const Viewer: React.FC = () => {
  const { settings } = useSettings();

  // Mapping objects for converting settings to CSS values
  const backgroundColorMap = {
    light: "#ffffff",
    dark: "#1a1a1a",
    auto: "#f5f5f5"
  } as const;

  const fontSizeMap = {
    small: "14px",
    medium: "16px",
    large: "18px"
  } as const;

  const textColorMap = {
    black: "#000000",
    blue: "#0066cc",
    green: "#006600",
    red: "#cc0000",
    yellow: "#cc9900"
  } as const;

  const textWidthMap = {
    narrow: "600px",
    medium: "800px",
    wide: "1000px"
  } as const;

  const letterSpacingMap = {
    tight: "-0.5px",
    normal: "0px",
    wide: "1px"
  } as const;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeConversion, setActiveConversion] = useState<string | null>(null);
  const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);



    const handleFileProcess = async (file: File) => {
      const ext = file.name.toLowerCase().split(".").pop();

      const allowed = ["jpg", "jpeg", "png", "pdf"];
      if (!ext || !allowed.includes(ext)) {
        alert("지원하지 않는 파일 형식입니다. .jpg, .png, .pdf 파일만 가능합니다.");
        return;
      }
    
      setSelectedFile(file);
      setUploadProgress(0);
      setIsUploading(true);
      setExtractedText("");
      setActiveConversion(null);
    
      if (["jpg", "jpeg", "png"].includes(ext)) {
        const reader = new FileReader();
        reader.onload = (e) => setFilePreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else if (ext === "pdf") {
        setPdfUrl(URL.createObjectURL(file));
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        // Only upload the file and get the file ID
        const uploadResponse = await axiosInstance.post("/viewer/file-upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percentCompleted);
          },
        });

        const fileId = uploadResponse.data.fileId;
        setUploadedFileId(fileId);
        setIsUploading(false);
        console.log("📂 파일 업로드 완료. 파일 ID:", fileId);
        
      } catch (error) {
        console.error("File upload error:", error);
        setIsUploading(false);
        alert("파일 업로드 중 오류가 발생했습니다.");
      }
    };

    // 변환 타입별 API 엔드포인트 매핑
    const getConversionEndpoint = (conversionType: string) => {
      const endpoints = {
        "가독성 향상": "/viewer/readability",
        "AI 요약": "/viewer/ai",
        "쉬운 문장": "/viewer/easy",
        "TTS 낭독": "/viewer/tts"
      };
      return endpoints[conversionType as keyof typeof endpoints] || "/viewer/readability";
    };


    

    // 변환 버튼 클릭 핸들러
    const handleConversionClick = async (conversionType: string) => {
      if (!uploadedFileId) {
        alert("먼저 파일을 업로드해주세요.");
        return;
      }
    
      setActiveConversion(conversionType);
      setIsProcessing(true);
      setExtractedText("");
    
      try {
        const endpoint = getConversionEndpoint(conversionType);
        console.log("Request to:", endpoint, "with fileId:", uploadedFileId);
    
        const response = await axiosInstance.post(endpoint, {
          fileId: uploadedFileId,
        });
      
        const { result } = response.data;
        console.log("📝 추출된 텍스트:", result);  // 콘솔 출력 추가
        setExtractedText(result);
        
      } catch (error) {``
        console.error(`${conversionType} 처리 오류:`, error);
        alert(`${conversionType} 처리 중 오류가 발생했습니다.`);
      } finally {
        setIsProcessing(false);
      }
    };
    

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) handleFileProcess(file);
  };

  const handleDropZoneClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview("");
    setPdfUrl("");
    setExtractedText("");
    setIsUploading(false);
    setUploadProgress(0);
    setUploadedFileId(null);
    setActiveConversion(null);
    setIsProcessing(false);
  };

  const isImageFile = (fileName: string) => {
    const extension = fileName.toLowerCase().split(".").pop();
    return ["jpg", "jpeg", "png"].includes(extension || "");
  };


  const conversionOptions = ["가독성 향상", "AI 요약", "쉬운 문장", "TTS 낭독"];

  return (
    <ViewerContainer>
      <Navigation />
      <ViewerContent>
        <ViewerTools>
          <LeftSection>
            <FileInput
              type="file"
              id="fileInput"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
            />
            <FileStatusDisplay>
              {selectedFile ? (
                <FileName>
                  <span>📄</span>
                  {selectedFile.name}
                  <RemoveFileButton onClick={handleRemoveFile}>
                    ×
                  </RemoveFileButton>
                </FileName>
              ) : (
                <span>새 파일을 업로드하세요</span>
              )}
            </FileStatusDisplay>
            <ToolSection>
              {isUploading ? (
                <LoadingContainer>
                  <ToolTitle>변환할 내용을 입력하세요</ToolTitle>
                  <LoadingText>잠시만 기다려주세요......</LoadingText>
                  <LoadingIcon src="/img/uploadFile.png" alt="Loading" />
                  <ProgressText>{uploadProgress}%</ProgressText>
                  <ProgressBar>
                    <ProgressFill $progress={uploadProgress} />
                  </ProgressBar>
                  <LoadingText>파일이 업로드되고 있습니다</LoadingText>
                </LoadingContainer>
              ) : selectedFile ? (
                <UploadedFileDisplay>
                  <FileContent>
                    {isImageFile(selectedFile.name) && filePreview ? (
                      <ImagePreview src={filePreview} alt="File preview" />
                    ) : selectedFile.name.toLowerCase().endsWith(".pdf") &&
                      pdfUrl ? (
                      <PDFPreview
                        src={pdfUrl}
                        title="PDF Viewer"
                        onLoad={() => console.log("PDF loaded")}
                        onError={() => console.log("PDF failed to load")}
                      />
                    ) : (
                      <PDFFallback>
                        <PDFIcon>📄</PDFIcon>
                        <PDFText>PDF 파일 미리보기</PDFText>
                      </PDFFallback>
                    )}
                  </FileContent>
                </UploadedFileDisplay>
              ) : (
                <>
                  <ToolTitle>변환할 내용을 입력하세요</ToolTitle>
                  <DropZone
                    onClick={handleDropZoneClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <DropZoneIcon src="/img/file.png" alt="Drop Zone" />
                    <DropZoneText>
                      변환할 이미지를 드래그하거나 붙여 넣어보세요.
                    </DropZoneText>
                  </DropZone>
                </>
              )}
            </ToolSection>
          </LeftSection>

          <RightSection>
            <ConversionButtons>
              {conversionOptions.map((option) => (
                <ConversionButton
                  key={option}
                  $active={activeConversion === option}
                  onClick={() => handleConversionClick(option)}
                  disabled={!uploadedFileId || isProcessing}
                >
                  {isProcessing && activeConversion === option ? "처리중..." : option}
                </ConversionButton>
              ))}
            </ConversionButtons>
            <ToolSection style={{ marginTop: "35px" }}>
              <ToolTitle>변환 내용을 확인하세요</ToolTitle>
              <ResultDisplay
                $bgColor={backgroundColorMap[settings.backgroundColor]}
                $fontSize={fontSizeMap[settings.fontSize]}
                $textColor={textColorMap[settings.textColor]}
                $width={textWidthMap[settings.textWidth as keyof typeof textWidthMap]}
                $letterSpacing={letterSpacingMap[settings.letterSpacing]}
              >
                {isProcessing ? (
                  <div style={{ textAlign: "center", color: "#666" }}>
                    <p>{activeConversion} 처리 중입니다...</p>
                  </div>
                ) : extractedText ? (
                  <div>{extractedText}</div>
                ) : uploadedFileId ? (
                  <p>변환 옵션을 선택하여 텍스트를 변환해보세요.</p>
                ) : (
                  <p>파일을 업로드한 후 변환 옵션을 선택해주세요.</p>
                )}
              </ResultDisplay>
            </ToolSection>
          </RightSection>
        </ViewerTools>
      </ViewerContent>
    </ViewerContainer>
  );
};

export default Viewer;
