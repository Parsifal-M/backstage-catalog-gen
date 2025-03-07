import { Paper, Box, Typography, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface EntityOutputProps {
  yamlContent: string;
}

export const EntityOutput = ({ yamlContent }: EntityOutputProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yamlContent);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          Generated YAML
        </Typography>
        <Button
          onClick={handleCopy}
          variant="outlined"
          color="primary"
          startIcon={<ContentCopyIcon />}
          size="small"
        >
          Copy to Clipboard
        </Button>
      </Box>

      <Box
        sx={{
          bgcolor: "background.default",
          p: 2,
          borderRadius: 1,
          overflow: "auto",
          maxHeight: 600,
          fontFamily: "'Fira Code', 'Roboto Mono', monospace",
          fontSize: "0.875rem",
          position: "relative",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <pre
          style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {yamlContent}
        </pre>
      </Box>
    </Paper>
  );
};
