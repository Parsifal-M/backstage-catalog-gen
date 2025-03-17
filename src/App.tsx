import { useState } from "react";
import { EntityForm } from "./components/EntityForm";
import { EntityOutput } from "./components/EntityOutput";
import { generateEntities } from "./utils/generateEntities";
import { EntityKind } from "./types";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Typography,
} from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7df3e1",
    },
    secondary: {
      main: "#a5a5f6",
    },
    background: {
      default: "#0e0c1d",
      paper: "#282740",
    },
    error: {
      main: "#ff88a7",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ababcb",
    },
  },
});

function App() {
  const [yamlContent, setYamlContent] = useState<string>("");

  const handleGenerate = (
    entityType: EntityKind,
    amount: number,
    owner?: string | null,
    annotations: Record<string, string> = {}
  ) => {
    const content = generateEntities(entityType, amount, owner, annotations);
    setYamlContent(content);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          component="header"
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            color="primary"
            gutterBottom
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            Backstage Entity Generator
          </Typography>
        </Box>

        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <EntityForm onGenerate={handleGenerate} />

          {yamlContent && (
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <EntityOutput yamlContent={yamlContent} />
            </Box>
          )}
          {!yamlContent && (
            <Box
              sx={{
                flexGrow: 1,
                width: "100%",
                bgcolor: "background.paper",
                borderRadius: 2,
                p: 3,
              }}
            >
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Fill out the form to start generating dummy entities for your
                Backstage catalog.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                You can copy and dump annotations into the text area below, or
                enter them manually, line by line in the below format, if you
                don't add any annotations it will not add any to the generated
                YAML.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <code>some/thing: cool</code>
                <br />
                <code>another/cool: idea</code>
              </Typography>
              <Typography
                variant="body2"
                color="#7df3e1"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                Nothing will be saved or sent anywhere.
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          component="footer"
          sx={{
            mt: 6,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">
            Silly little tool to generate YAML for Backstage catalog entities.
            Made with ❤️ and ☕️ by{" "}
            <a
              href="https://github.com/Parsifal-M"
              style={{ color: "#7df3e1", textDecoration: "none" }}
            >
              Peter
            </a>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
