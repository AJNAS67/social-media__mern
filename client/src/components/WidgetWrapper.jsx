import { Box } from "@mui/material";
import { styled } from "@mui/system";
const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5em 1.5em 0.75em 1.5em",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.75rem",
}));
export default WidgetWrapper;
