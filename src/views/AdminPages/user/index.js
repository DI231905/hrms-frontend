import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import IconButton from '@mui/material/IconButton';
import EditIcon from "@mui/icons-material/Edit";
import PageHeader from "ui-component/cards/PageHeader";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { adduser, getUser } from "services/userService";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useDemoData } from "@mui/x-data-grid-generator";
import { useNavigate } from "react-router";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("User Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    cardId: Yup.string().required("Card ID is required"),
    birthDate: Yup.string().required("Birth Date is required"),
    joinDate: Yup.string().required("Join Date is required"),
    mobileNo: Yup.string().required("Mobile No is required"),
    password: Yup.string().required("Password is required"),
    designationId: Yup.string().required("Designation is required"),
    role: Yup.string().required("Role is required"),
    status: Yup.string().required("Status is required"),
  });

  const columns = [
    {
      field: "name",
      headerName: "name",
      width: 150,
      editable: true,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "mobileno",
      headerName: "Mobile Number",
      width: 180,
      // align: "center",
      // valueFormatter: (params) => (isNaN(params.value) ? params.value : `+${params.value}`),
    },
    {
      field: "altMobileNo",
      headerName: "Alt Phonee Number",
      width: 180,
    },
    {
      field: "parentMobileNo",
      headerName: "Parent Number",
      width: 180,
    },
    {
      field: "BirthDate",
      headerName: "Birth Date",
      width: 150,
    },

    {
      field: "JoinDate",
      headerName: "Join Date",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      disableExport: true,
      renderCell: renderActionCell,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      filterable: false,
      align: "center",
      disableReorder: true,
      resizable: false,
    },
  ];

  function renderActionCell(params) {
    console.log(params, "params");
    return (
      <IconButton
        color="inherit"
        size="small"
        aria-label="edit"
        onClick={() => handleViewClick(params)}
      >
        <EditIcon size="small" />
      </IconButton>
    );
  }

  const handleViewClick = (params) => {
    console.log(params, "params");
    navigate(`/admin/config/user/edit/${params.id}`);
  };

  useEffect(() => {
    setLoader(true);
    dispatch(
      getUser((res) => {
        console.log(res);
        setUserList(res);
        setLoader(false);
      })
    );
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <PageHeader>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h3" sx={{ flexGrow: 1 }}>
              User
            </Typography>
            {/* Example of adding a button with an icon */}
            <IconButton
              size="small"
              sx={{ ml: 2 }} // Adjust margin left for spacing
              color="primary"
              aria-label="add"
              onClick={() => navigate("/admin/config/user/create")}
            >
              <AddIcon />
            </IconButton>
          </div>
        </PageHeader>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        {!loader && (
          <Box sx={{ height: 520, width: "100%" }}>
            <DataGridPro
              rows={userList}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );

  // return (
  //   <Grid container spacing={2}>
  //     <Grid item xs={12} sm={12} md={12}>
  //       <PageHeader>
  //         <div style={{ display: "flex", alignItems: "center" }}>
  //           <Typography variant="h3" sx={{ flexGrow: 1 }}>
  //             User
  //           </Typography>
  //           {/* Example of adding a button with an icon */}
  //           {/* <IconButton
  //             size="small"
  //             sx={{ ml: 2 }} // Adjust margin left for spacing
  //             color="primary"
  //             aria-label="add"
  //           >
  //             <AddIcon />
  //           </IconButton> */}
  //         </div>
  //       </PageHeader>
  //     </Grid>
  //     <Grid item xs={12} sm={12} md={12}>
  //       <Grid
  //         container
  //         justifyContent="center"
  //         alignItems="center"
  //         minHeight="100vh"
  //       >
  //         <Grid item xs={12} sm={12} md={12} lg={12}>
  //           <Paper elevation={3} style={{ padding: "20px" }}>
  //             {/* Formik wrapper for form management */}

  //             <Formik
  //               initialValues={initialValues}
  //               onSubmit={onSubmit}
  //               validationSchema={validationSchema}
  //             >
  //               {({
  //                 values,
  //                 handleChange,
  //                 setFieldValue,
  //                 errors,
  //                 touched,
  //                 isSubmitting,
  //               }) => (
  //                 <Form>
  //                   <div style={{ textAlign: "center", marginBottom: "20px" }}>
  //                     <input
  //                       accept="image/*"
  //                       id="profile-picture-input"
  //                       type="file"
  //                       style={{ display: "none" }}
  //                       onChange={(event) => {
  //                         setFieldValue(
  //                           "profilePicture",
  //                           event.currentTarget.files[0]
  //                         );
  //                       }}
  //                     />
  //                     <label htmlFor="profile-picture-input">
  //                       <IconButton
  //                         color="primary"
  //                         aria-label="upload picture"
  //                         component="span"
  //                       >
  //                         <AddIcon />
  //                       </IconButton>
  //                     </label>
  //                     <div
  //                       style={{
  //                         borderRadius: "50%",
  //                         width: "100px",
  //                         height: "100px",
  //                         overflow: "hidden",
  //                         margin: "auto",
  //                       }}
  //                     >
  //                       <img
  //                         src={
  //                           values.profilePicture
  //                             ? URL.createObjectURL(values.profilePicture)
  //                             : "default_user_icon.png" // Replace "default_user_icon.png" with your default user icon image path
  //                         }
  //                         alt="Profile"
  //                         style={{
  //                           width: "100%",
  //                           height: "100%",
  //                           objectFit: "cover",
  //                         }}
  //                       />
  //                     </div>
  //                   </div>
  //                   <Grid container spacing={2}>
  //                     {/* Left part of the form */}
  //                     <Grid item xs={12} md={6}>
  //                       {/* User Name field */}
  //                       <TextField
  //                         name="userName"
  //                         label="User Name"
  //                         value={values.userName}
  //                         onChange={handleChange}
  //                         fullWidth
  //                         margin="normal"
  //                         error={touched.userName && Boolean(errors.userName)}
  //                         helperText={<ErrorMessage name="userName" />}
  //                       />
  //                       {/* Email field */}
  //                       <TextField
  //                         name="email"
  //                         label="Email"
  //                         value={values.email}
  //                         onChange={handleChange}
  //                         fullWidth
  //                         margin="normal"
  //                         error={touched.email && Boolean(errors.email)}
  //                         helperText={<ErrorMessage name="email" />}
  //                       />
  //                       {/* Card ID field */}
  //                       <TextField
  //                         name="cardId"
  //                         label="Card ID"
  //                         value={values.cardId}
  //                         onChange={handleChange}
  //                         fullWidth
  //                         margin="normal"
  //                         error={touched.cardId && Boolean(errors.cardId)}
  //                         helperText={<ErrorMessage name="cardId" />}
  //                       />
  //                       {/* Birth Date field */}
  //                       <TextField
  //                         name="birthDate"
  //                         label="Birth Date"
  //                         type="date"
  //                         value={values.birthDate}
  //                         onChange={handleChange}
  //                         fullWidth
  //                         margin="normal"
  //                         error={touched.birthDate && Boolean(errors.birthDate)}
  //                         helperText={<ErrorMessage name="birthDate" />}
  //                         InputLabelProps={{
  //                           shrink: true,
  //                         }}
  //                       />
  //                       {/* Join Date field */}
  //                       <TextField
  //                         name="joinDate"
  //                         label="Join Date"
  //                         type="date"
  //                         value={values.joinDate}
  //                         onChange={handleChange}
  //                         fullWidth
  //                         margin="normal"
  //                         error={touched.joinDate && Boolean(errors.joinDate)}
  //                         helperText={<ErrorMessage name="joinDate" />}
  //                         InputLabelProps={{
  //                           shrink: true,
  //                         }}
  //                       />
  //                       {/* Reporting Officer field */}
  //                       <TextField
  //                         name="reportingOfficer"
  //                         label="Reporting Officer"
  //                         value={values.reportingOfficer}
  //                         onChange={handleChange}
  //                         fullWidth
  //                         margin="normal"
  //                         error={
  //                           touched.reportingOfficer &&
  //                           Boolean(errors.reportingOfficer)
  //                         }
  //                         helperText={<ErrorMessage name="reportingOfficer" />}
  //                       />
  //                       {/* Add more fields here */}
  //                     </Grid>
  //                     {/* Right part of the form */}
  //                     <Grid item xs={12} md={6}>
  //                       {/* Mobile No field */}
  //                       <TextField
  //                         name="mobileNo"
  //                         label="Mobile No"
  //                         value={values.mobileNo}
  //                         onChange={handleChange}
  //                         fullWidth
  //                         margin="normal"
  //                         error={touched.mobileNo && Boolean(errors.mobileNo)}
  //                         helperText={<ErrorMessage name="mobileNo" />}
  //                       />
  //                       {/* Alternate Mobile No field */}
  //                       <TextField
  //                         name="altMobileNo"
  //                         label="Alternate Mobile No"
  //                         value={values.altMobileNo}
  //                         onChange={handleChange}
  //                         fullWidth
  //                         margin="normal"
  //                         error={
  //                           touched.altMobileNo && Boolean(errors.altMobileNo)
  //                         }
  //                         helperText={<ErrorMessage name="altMobileNo" />}
  //                       />
  //                       {/* Parent Mobile No field */}
  //                       <TextField
  //                         name="parentMobileNo"
  //                         label="Parent Mobile No"
  //                         value={values.parentMobileNo}
  //                         onChange={handleChange}
  //                         fullWidth
  //                         margin="normal"
  //                         error={
  //                           touched.parentMobileNo &&
  //                           Boolean(errors.parentMobileNo)
  //                         }
  //                         helperText={<ErrorMessage name="parentMobileNo" />}
  //                       />

  //                       {/* Password field */}
  //                       <TextField
  //                         name="password"
  //                         label="Password"
  //                         type="password"
  //                         value={values.password}
  //                         onChange={handleChange}
  //                         fullWidth
  //                         margin="normal"
  //                         error={touched.password && Boolean(errors.password)}
  //                         helperText={<ErrorMessage name="password" />}
  //                       />
  //                       {/* Designation field (dropdown) */}
  //                       <FormControl
  //                         variant="outlined"
  //                         style={{
  //                           width: "100%",
  //                           marginTop: "16px",
  //                           marginBottom: "16px",
  //                         }}
  //                       >
  //                         <InputLabel htmlFor="outlined-age-native-simple">
  //                           Designation
  //                         </InputLabel>
  //                         <Select
  //                           native
  //                           name="designationId"
  //                           value={values.designationId}
  //                           onChange={handleChange}
  //                           label="Designation"
  //                         >
  //                           <option aria-label="None" value="" />
  //                           <option value={1}>Software Enigneer</option>
  //                           <option value={2}>Senior Software Enigneer</option>
  //                           <option value={3}>Project Manager</option>
  //                         </Select>
  //                       </FormControl>
  //                       <FormControl
  //                         variant="outlined"
  //                         style={{
  //                           width: "100%",
  //                           marginTop: "16px",
  //                           marginBottom: "16px",
  //                         }}
  //                       >
  //                         <InputLabel htmlFor="outlined-age-native-simple">
  //                           Role
  //                         </InputLabel>
  //                         <Select
  //                           id="role"
  //                           name="role"
  //                           label="Role"
  //                           value={values.role}
  //                           onChange={handleChange}
  //                           error={Boolean(errors.role)}
  //                         >
  //                           <MenuItem value="">Select Role</MenuItem>
  //                           <MenuItem value="admin">Admin</MenuItem>
  //                           <MenuItem value="user">User</MenuItem>
  //                         </Select>
  //                         <ErrorMessage name="role" />
  //                       </FormControl>
  //                       {/* Status dropdown */}
  //                       <FormControl
  //                         variant="outlined"
  //                         style={{
  //                           width: "100%",
  //                           marginTop: "16px",
  //                           marginBottom: "16px",
  //                         }}
  //                       >
  //                         <InputLabel htmlFor="outlined-age-native-simple">
  //                           Status
  //                         </InputLabel>
  //                         <Select
  //                           id="status"
  //                           name="status"
  //                           value={values.status}
  //                           onChange={handleChange}
  //                           label="Status"
  //                           error={Boolean(errors.status)}
  //                         >
  //                           <MenuItem value="">Select Status</MenuItem>
  //                           <MenuItem value="active">Active</MenuItem>
  //                           <MenuItem value="inactive">Inactive</MenuItem>
  //                         </Select>
  //                         <ErrorMessage name="status" />
  //                       </FormControl>
  //                       {/* <FormControl
  //                         fullWidth
  //                         margin="normal"
  //                         error={
  //                           touched.designationId &&
  //                           Boolean(errors.designationId)
  //                         }
  //                       >
  //                         <InputLabel
  //                           htmlFor="designationId"
  //                           shrink
  //                           style={{
  //                             backgroundColor: "#fff",
  //                             paddingLeft: "8px",
  //                             paddingRight: "8px",
  //                             marginTop: "-6px",
  //                           }}
  //                         >
  //                           Designation
  //                         </InputLabel>
  //                         <Select
  //                           name="designationId"
  //                           value={values.designationId}
  //                           onChange={handleChange}
  //                           fullWidth
  //                         >
  //                           <MenuItem value="" disabled>
  //                             Select Designation
  //                           </MenuItem>
  //                           <MenuItem value={1}>Designation 1</MenuItem>
  //                           <MenuItem value={2}>Designation 2</MenuItem>
  //                         </Select>
  //                       </FormControl> */}
  //                       {/* Leave Approval Rights field (checkbox) */}
  //                       <FormControlLabel
  //                         control={
  //                           <Checkbox
  //                             name="leaveApprovalRights"
  //                             checked={values.leaveApprovalRights}
  //                             onChange={handleChange}
  //                           />
  //                         }
  //                         label="Leave Approval Rights"
  //                       />
  //                       {/* PMS Admin field (checkbox) */}
  //                       <FormControlLabel
  //                         control={
  //                           <Checkbox
  //                             name="pmsAdmin"
  //                             checked={values.pmsAdmin}
  //                             onChange={handleChange}
  //                           />
  //                         }
  //                         label="PMS Admin"
  //                       />
  //                       {/* Don't Send Time Mail field (checkbox) */}
  //                       <FormControlLabel
  //                         control={
  //                           <Checkbox
  //                             name="dontSendTimeMail"
  //                             checked={values.dontSendTimeMail}
  //                             onChange={handleChange}
  //                           />
  //                         }
  //                         label="Don't Send Time Mail"
  //                       />
  //                       {/* Archive field (checkbox) */}
  //                       <FormControlLabel
  //                         control={
  //                           <Checkbox
  //                             name="archive"
  //                             checked={values.archive}
  //                             onChange={handleChange}
  //                           />
  //                         }
  //                         label="Archive"
  //                       />

  //                       {/* Add more fields here */}
  //                     </Grid>
  //                   </Grid>
  //                   {/* Submit button */}
  //                   <Button
  //                     type="submit"
  //                     variant="contained"
  //                     color="primary"
  //                     disabled={isSubmitting}
  //                     fullWidth
  //                   >
  //                     {isSubmitting ? "Submitting..." : "Submit"}
  //                   </Button>
  //                 </Form>
  //               )}
  //             </Formik>
  //           </Paper>
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //   </Grid>
  // );
};

export default User;
