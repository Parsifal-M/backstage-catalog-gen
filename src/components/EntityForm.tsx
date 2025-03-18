import { useEffect, useState } from "react";
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
import { EntityKind } from "../types";
import { generators } from "../generators/registry";
interface EntityFormProps {
  onGenerate: (
    kind: EntityKind,
    amount: number,
    owner?: string | null,
    annotations?: Record<string, string>
  ) => void;
}

export const EntityForm = ({ onGenerate }: EntityFormProps) => {
  const [entityKind, setEntityKind] = useState<EntityKind>("Component");
  const [amount, setAmount] = useState<number>(1);
  const [owner, setOwner] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [annotationsText, setAnnotationsText] = useState<string>("");
  const [showOwnerField, setShowOwnerField] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount < 1 || amount > 50) {
      setError("Please enter an amount between 1 and 50");
      return;
    }

    setError(null);
    const parsedAnnotations = parseAnnotations(annotationsText);
    onGenerate(entityKind, amount, owner, parsedAnnotations);
  };

  useEffect(() => {
    setShowOwnerField(!["User", "Group"].includes(entityKind));
  }, [entityKind]);

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
            <InputLabel id="entity-kind-label">Entity Kind</InputLabel>
            <Select
              labelId="entity-kind-label"
              id="entityKind"
              value={entityKind}
              onChange={(e) => setEntityKind(e.target.value as EntityKind)}
              label="Entity Kind"
            >
              {Object.keys(generators).map((kind) => (
                <MenuItem key={kind} value={kind}>
                  {kind}
                </MenuItem>
              ))}
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

          {showOwnerField && (<TextField
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
          />)}

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
