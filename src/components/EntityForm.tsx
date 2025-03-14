import { useState } from "react";
import { EntityType } from "../types";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { parseAnnotations } from "../utils/parseAnnotations";

interface EntityFormProps {
  onGenerate: (
    type: EntityType,
    amount: number,
    owner?: string | null,
    annotations?: Record<string, string>
  ) => void;
}

export const EntityForm = ({ onGenerate }: EntityFormProps) => {
  const [entityType, setEntityType] = useState<EntityType>("Component");
  const [amount, setAmount] = useState<number>(1);
  const [owner, setOwner] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [annotationsText, setAnnotationsText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount < 1 || amount > 50) {
      setError("Please enter an amount between 1 and 50");
      return;
    }

    setError(null);
    const parsedAnnotations = parseAnnotations(annotationsText);
    onGenerate(entityType, amount, owner, parsedAnnotations);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        width: "100%",
        maxWidth: 330,
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        align="left"
        color="primary"
        sx={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          letterSpacing: "-0.5px",
          paddingBottom: "20px",
        }}
      >
        Generate Entities
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="entity-type-label">Entity Type</InputLabel>
            <Select
              labelId="entity-type-label"
              id="entityType"
              value={entityType}
              onChange={(e) => setEntityType(e.target.value as EntityType)}
              label="Entity Type"
            >
              <MenuItem value="Component">Component</MenuItem>
              <MenuItem value="API">API</MenuItem>
              <MenuItem value="System">System</MenuItem>
              <MenuItem value="Domain">Domain</MenuItem>
              <MenuItem value="Resource">Resource</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            id="amount"
            label="Amount"
            slotProps={{ htmlInput: { min: 1, max: 50 } }}
            type="number"
            variant="outlined"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(parseInt(e.target.value) || 0)
            }
            error={!!error}
            helperText={error ?? "Number of entities to generate (1-50)"}
          />

          <TextField
            fullWidth
            id="owner"
            label="Owner (optional)"
            variant="outlined"
            placeholder="team-awesome-sauce"
            value={owner}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOwner(e.target.value)
            }
            helperText="Owner of the entities"
          />

          <TextField
            fullWidth
            id="annotations"
            label="Add Annotations"
            multiline
            rows={5}
            variant="outlined"
            placeholder="foo/bar: baz"
            value={annotationsText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAnnotationsText(e.target.value)
            }
            helperText="You can add annotations in the format 'key: value' separated by new lines"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Generate
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
