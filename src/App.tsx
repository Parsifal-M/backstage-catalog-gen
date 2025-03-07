import { useState } from "react";
import { EntityForm } from "./components/EntityForm";
import { EntityOutput } from "./components/EntityOutput";
import { generateEntities } from "./utils/generateEntities";
import { EntityType } from "./types";
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
    entityType: EntityType,
    amount: number,
    owner?: string,
  ) => {
    const content = generateEntities(entityType, amount, owner);
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
            <a href="https://github.com/Parsifal-M">Peter</a>.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
