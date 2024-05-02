import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBoxBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper.jsx";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { setPost } from "../../state/index";
const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
          formData.append("picture", image);
          formData.append("picturePath", image.name);
        }
    
        const response = await fetch(`http://localhost:3001/posts`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
      };
  return (
    <WidgetWrapper>
    <FlexBoxBetween gap="1.5rem">
      <UserImage image={picturePath} />
      <InputBase
        placeholder="What's on your mind..."
        onChange={(e) => setPost(e.target.value)}
        value={post}
        sx={{
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: "1rem 2rem",
        }}
      />
    </FlexBoxBetween>
    {isImage && (
      <Box
        border={`1px solid ${medium}`}
        borderRadius="5px"
        mt="1rem"
        p="1rem"
      >
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <FlexBoxBetween>
              <Box
                {...getRootProps()}
                border={`2px dashed ${palette.primary.main}`}
                p="1rem"
                width="100%"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input {...getInputProps()} />
                {!image ? (
                  <p>Add Image Here</p>
                ) : (
                  <FlexBoxBetween>
                    <Typography>{image.name}</Typography>
                    <EditOutlined />
                  </FlexBoxBetween>
                )}
              </Box>
              {image && (
                <IconButton
                  onClick={() => setImage(null)}
                  sx={{ width: "15%" }}
                >
                  <DeleteOutlined />
                </IconButton>
              )}
            </FlexBoxBetween>
          )}
        </Dropzone>
      </Box>
    )}

    <Divider sx={{ margin: "1.25rem 0" }} />

    <FlexBoxBetween>
      <FlexBoxBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
        <ImageOutlined sx={{ color: mediumMain }} />
        <Typography
          color={mediumMain}
          sx={{ "&:hover": { cursor: "pointer", color: medium } }}
        >
          Image
        </Typography>
      </FlexBoxBetween>

      {isNonMobileScreens ? (
        <>
          <FlexBoxBetween gap="0.25rem">
            <GifBoxOutlined sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Clip</Typography>
          </FlexBoxBetween>

          <FlexBoxBetween gap="0.25rem">
            <AttachFileOutlined sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Attachment</Typography>
          </FlexBoxBetween>

          <FlexBoxBetween gap="0.25rem">
            <MicOutlined sx={{ color: mediumMain }} />
            <Typography color={mediumMain}>Audio</Typography>
          </FlexBoxBetween>
        </>
      ) : (
        <FlexBoxBetween gap="0.25rem">
          <MoreHorizOutlined sx={{ color: mediumMain }} />
        </FlexBoxBetween>
      )}

      <Button
        disabled={!post}
        onClick={handlePost}
        sx={{
          color: palette.background.alt,
          backgroundColor: palette.primary.main,
          borderRadius: "3rem",
        }}
      >
        POST
      </Button>
    </FlexBoxBetween>
  </WidgetWrapper>
  )
};

export default MyPostWidget;
