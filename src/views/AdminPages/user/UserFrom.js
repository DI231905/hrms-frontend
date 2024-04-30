import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
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
import {
  adduser,
  designationsList,
  getUser,
  getUserById,
} from "services/userService";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { NotificationManager } from "react-notifications";
import { ProfileURL } from "constants/constants";

const UserFrom = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [designationList, setDesignationList] = useState([]);
  const [reportingOfficerList,setReportingOfficerList] = useState([])
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { id } = param;
  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("User Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    birthDate: Yup.string().required("Birth Date is required"),
    joinDate: Yup.string().required("Join Date is required"),
    mobileNo: Yup.string().required("Mobile No is required"),
    password: Yup.string(),
    designationId: Yup.string().required("Designation is required"),
    role: Yup.string().required("Role is required"),
    status: Yup.string().required("Status is required"),
  });

  // Initial form values
  let initialValues = {
    id: "",
    userName: "",
    email: "",
    birthDate: "",
    joinDate: "",
    reLievingDate: "",
    mobileNo: "",
    altMobileNo: "",
    parentMobileNo: "",
    reportingOfficer: "",
    leaveApprovalRights: false,
    pmsAdmin: false,
    dontSendTimeMail: false,
    archive: false,
    password: "",
    designationId: 2, // Initial value for dropdown
    profile_image: null,
    role: "",
    status: "",
  };
  console.log(initialValues);

  useEffect(() => {
    dispatch(
      designationsList((res) => {
        setDesignationList(res.designations);
        setReportingOfficerList(res.reportingOfficers)
      })
    );
    setLoader(true);
    if (id) {
      dispatch(
        getUserById(id, (res) => {
          console.log(res);
          initialValues.id = res.id;
          initialValues.userName = res.name;
          initialValues.email = res.Email;
          initialValues.profile_image = res.profile_image;
          initialValues.birthDate = res.BirthDate;
          initialValues.joinDate = res.JoinDate;
          initialValues.reLievingDate = res.ReLievingDate;
          initialValues.mobileNo = res.mobileno;
          initialValues.altMobileNo = res.altmobileno;
          initialValues.parentMobileNo = res.parentmobileno;
          initialValues.reportingOfficer = res.reportingOfficer;
          initialValues.leaveApprovalRights =
            res.leaveApprovalRights == 1 ? true : false || false;
          initialValues.pmsAdmin = res.pms_admin == 1 ? true : false || false;
          initialValues.dontSendTimeMail =
            res.dontSendTimeMail == 1 ? true : false || false;
          initialValues.archive = res.archive == 1 ? true : false || false;
          initialValues.designationId = res.designationId || 2; // Initial value for dropdown
          initialValues.role = res.Role;
          initialValues.status = res.Status;

          //   setUserList(res);
          //   setLoader(false);
          setLoader(false);
        })
      );
    }
  }, []);

  // Form submission logic
  const onSubmit = (values, { setSubmitting }) => {
    console.log(values, "values");
    // You can perform API call here to send form data to the server
    console.log(values);
    let formData = new FormData();
    formData.append("id", values.id);
    formData.append("filename", values.profile_image); // Appen
    formData.append("userName", values.userName);
    formData.append("email", values.email);
    formData.append("birthDate", values.birthDate);
    formData.append("joinDate", values.joinDate);
    formData.append("reLievingDate", values.reLievingDate);
    formData.append("mobileNo", values.mobileNo);
    formData.append("altMobileNo", values.altMobileNo);
    formData.append("parentMobileNo", values.parentMobileNo);
    formData.append("reportingOfficer", values.reportingOfficer);
    formData.append("leaveApprovalRights", values.leaveApprovalRights);
    formData.append("pmsAdmin", values.pmsAdmin);
    formData.append("dontSendTimeMail", values.dontSendTimeMail);
    formData.append("archive", values.archive);
    formData.append("password", values.password);
    formData.append("designationId", values.designationId);
    formData.append("role", values.role);
    formData.append("status", values.status);

    dispatch(
      adduser(formData, (res) => {
        console.log(res, "res");
        if (id) {
          if (res.status) {
            NotificationManager.success(res.response, "", 1000);
          } else {
            NotificationManager.error("error", "", 1000);
          }
        } else {
          if (res.status) {
            NotificationManager.success(res.response, "", 1000);
          } else {
            NotificationManager.error("error", "", 1000);
          }
        }
      })
    );
    setSubmitting(false);
  };

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
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>
        </PageHeader>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              {/* Formik wrapper for form management */}

              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  handleChange,
                  setFieldValue,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <Form>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <input
                        accept="image/*"
                        id="profile-picture-input"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setFieldValue(
                            "profile_image",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      <label htmlFor="profile-picture-input">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <AddIcon />
                        </IconButton>
                      </label>
                      <div
                        style={{
                          borderRadius: "50%",
                          width: "100px",
                          height: "100px",
                          overflow: "hidden",
                          margin: "auto",
                        }}
                      >
                        <img
                          src={
                            values.profile_image
                              ? id
                                ? `${ProfileURL}/${id}/${values.profile_image}`
                                : URL.createObjectURL(values.profile_image)
                              : "default_user_icon.png" // Replace "default_user_icon.png" with your default user icon image path
                          }
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                    <Grid container spacing={2}>
                      {/* Left part of the form */}
                      <Grid item xs={12} md={6}>
                        {/* User Name field */}
                        <TextField
                          name="userName"
                          label="User Name"
                          value={values.userName}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                          error={touched.userName && Boolean(errors.userName)}
                          helperText={<ErrorMessage name="userName" />}
                        />
                        {/* Email field */}
                        <TextField
                          name="email"
                          label="Email"
                          value={values.email}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                          error={touched.email && Boolean(errors.email)}
                          helperText={<ErrorMessage name="email" />}
                        />
                        {/* Birth Date field */}
                        <TextField
                          name="birthDate"
                          label="Birth Date"
                          type="date"
                          value={values.birthDate}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                          error={touched.birthDate && Boolean(errors.birthDate)}
                          helperText={<ErrorMessage name="birthDate" />}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        {/* Join Date field */}
                        <TextField
                          name="joinDate"
                          label="Join Date"
                          type="date"
                          value={values.joinDate}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                          error={touched.joinDate && Boolean(errors.joinDate)}
                          helperText={<ErrorMessage name="joinDate" />}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        {/* Reporting Officer field */}
                        {/* <TextField
                          name="reportingOfficer"
                          label="Reporting Officer"
                          value={values.reportingOfficer}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                          error={
                            touched.reportingOfficer &&
                            Boolean(errors.reportingOfficer)
                          }
                          helperText={<ErrorMessage name="reportingOfficer" />}
                        /> */}
                        <FormControl
                          variant="outlined"
                          style={{
                            width: "100%",
                            marginTop: "16px",
                            marginBottom: "16px",
                          }}
                        >
                          <InputLabel htmlFor="outlined-age-native-simple">
                          Reporting Officer
                          </InputLabel>
                          <Select
                            native
                            name="reportingOfficer"
                            value={values.reportingOfficer}
                            onChange={handleChange}
                            label="Reporting Officer"
                          >
                            <option aria-label="None" value="" />
                            <option aria-label="None" value="" />
                            {reportingOfficerList && reportingOfficerList.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        {/* Add more fields here */}
                      </Grid>
                      {/* Right part of the form */}
                      <Grid item xs={12} md={6}>
                        {/* Mobile No field */}
                        <TextField
                          name="mobileNo"
                          label="Mobile No"
                          value={values.mobileNo}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                          error={touched.mobileNo && Boolean(errors.mobileNo)}
                          helperText={<ErrorMessage name="mobileNo" />}
                        />
                        {/* Alternate Mobile No field */}
                        <TextField
                          name="altMobileNo"
                          label="Alternate Mobile No"
                          value={values.altMobileNo}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                          error={
                            touched.altMobileNo && Boolean(errors.altMobileNo)
                          }
                          helperText={<ErrorMessage name="altMobileNo" />}
                        />
                        {/* Parent Mobile No field */}
                        <TextField
                          name="parentMobileNo"
                          label="Parent Mobile No"
                          value={values.parentMobileNo}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                          error={
                            touched.parentMobileNo &&
                            Boolean(errors.parentMobileNo)
                          }
                          helperText={<ErrorMessage name="parentMobileNo" />}
                        />

                        {/* Password field */}
                        <TextField
                          name="password"
                          label="Password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          fullWidth
                          margin="normal"
                          error={touched.password && Boolean(errors.password)}
                          helperText={<ErrorMessage name="password" />}
                        />
                        {/* Designation field (dropdown) */}
                        <FormControl
                          variant="outlined"
                          style={{
                            width: "100%",
                            marginTop: "16px",
                            marginBottom: "16px",
                          }}
                        >
                          <InputLabel htmlFor="outlined-age-native-simple">
                            Designation
                          </InputLabel>
                          <Select
                            native
                            name="designationId"
                            value={values.designationId}
                            onChange={handleChange}
                            label="Designation"
                          >
                            <option aria-label="None" value="" />
                            <option aria-label="None" value="" />
                            {designationList && designationList.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl
                          variant="outlined"
                          style={{
                            width: "100%",
                            marginTop: "16px",
                            marginBottom: "16px",
                          }}
                        >
                          <InputLabel htmlFor="outlined-age-native-simple">
                            Role
                          </InputLabel>
                          <Select
                            id="role"
                            name="role"
                            label="Role"
                            value={values.role}
                            onChange={handleChange}
                            error={Boolean(errors.role)}
                          >
                            <MenuItem value="">Select Role</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                          </Select>
                          <ErrorMessage name="role" />
                        </FormControl>
                        {/* Status dropdown */}
                        <FormControl
                          variant="outlined"
                          style={{
                            width: "100%",
                            marginTop: "16px",
                            marginBottom: "16px",
                          }}
                        >
                          <InputLabel htmlFor="outlined-age-native-simple">
                            Status
                          </InputLabel>
                          <Select
                            id="status"
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            label="Status"
                            error={Boolean(errors.status)}
                          >
                            <MenuItem value="">Select Status</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                          </Select>
                          <ErrorMessage name="status" />
                        </FormControl>
                        {/* <FormControl
                            fullWidth
                            margin="normal"
                            error={
                              touched.designationId &&
                              Boolean(errors.designationId)
                            }
                          >
                            <InputLabel
                              htmlFor="designationId"
                              shrink
                              style={{
                                backgroundColor: "#fff",
                                paddingLeft: "8px",
                                paddingRight: "8px",
                                marginTop: "-6px",
                              }}
                            >
                              Designation
                            </InputLabel>
                            <Select
                              name="designationId"
                              value={values.designationId}
                              onChange={handleChange}
                              fullWidth
                            >
                              <MenuItem value="" disabled>
                                Select Designation
                              </MenuItem>
                              <MenuItem value={1}>Designation 1</MenuItem>
                              <MenuItem value={2}>Designation 2</MenuItem>
                            </Select>
                          </FormControl> */}
                        {/* Leave Approval Rights field (checkbox) */}
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="leaveApprovalRights"
                              checked={values.leaveApprovalRights}
                              onChange={handleChange}
                            />
                          }
                          label="Leave Approval Rights"
                        />
                        {/* PMS Admin field (checkbox) */}
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="pmsAdmin"
                              checked={values.pmsAdmin}
                              onChange={handleChange}
                            />
                          }
                          label="PMS Admin"
                        />
                        {/* Don't Send Time Mail field (checkbox) */}
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="dontSendTimeMail"
                              checked={values.dontSendTimeMail}
                              onChange={handleChange}
                            />
                          }
                          label="Don't Send Time Mail"
                        />
                        {/* Archive field (checkbox) */}
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="archive"
                              checked={values.archive}
                              onChange={handleChange}
                            />
                          }
                          label="Archive"
                        />

                        {/* Add more fields here */}
                      </Grid>
                    </Grid>
                    {/* Submit button */}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserFrom;
