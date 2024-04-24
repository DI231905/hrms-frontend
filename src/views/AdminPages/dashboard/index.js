import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PageHeader from "ui-component/cards/PageHeader";

const Dashboard = () => { 
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <PageHeader>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h3" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            {/* Example of adding a button with an icon */}
            {/* <IconButton
              size="small"
              sx={{ ml: 2 }} // Adjust margin left for spacing
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </IconButton> */}
          </div>
        </PageHeader>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
