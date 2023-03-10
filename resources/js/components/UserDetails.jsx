import { useState, useEffect } from "react";
import axios from "axios";
import PreviousAddress from "./PreviousAddress";

function UserDetails() {
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);

  useEffect(() => {
    async function fetchData() {
      axios
        .post("/user-tracking", {})
        .then((response) => {
          console.log("User tracking data saved successfully");
        })
        .catch((error) => {
          console.error("Error saving user tracking data", error);
        });
    }
    fetchData();
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lstDobDay, setLstDobDay] = useState("");
  const [lstDobMonth, setLstDobMonth] = useState("");
  const [lstDobYear, setLstDobYear] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const [stepFinal, setStepFinal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
  });

  const [form2Data, setForm2Data] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    date_of_birth: "",
  });

  const dobCreate = (e) => {
    if (e.target.name === "lstDobDay") {
      setLstDobDay(e.target.value);
    }
    if (e.target.name === "lstDobMonth") {
      setLstDobMonth(e.target.value);
    }
    if (e.target.name === "lstDobYear") {
      const year = e.target.value;
      setLstDobYear(year);
    }
  };
  useEffect(() => {
    if (lstDobYear && lstDobMonth && lstDobDay) {
      const myDate = new Date(lstDobYear, lstDobMonth, lstDobDay);
      setDob(myDate);
    }
  }, [lstDobYear, lstDobMonth, lstDobDay]);

  const [formErrors, setFormErrors] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    date_of_birth: "",
  });
  const validateStepOneForm = () => {
    let isStepOneValid = true;

    let errors = {};
const nameRegex = /^[a-zA-Z\s]+$/;
    if (!firstName || typeof firstName !== "string" || !nameRegex.test(firstName)) {
    errors.first_name = "First name is required and must be a string";
    isStepOneValid = false;
    } 

    if(!lastName || typeof lastName !== "string" || !nameRegex.test(lastName)) {
    errors.last_name = "Last name is required and must be a string";
    isStepOneValid = false;
    } 
    // Validate date of birth
    if (!dob) {
      errors.date_of_birth = "Date of birth is required";
      isStepOneValid = false;
    }

    setFormErrors(errors);
    return isStepOneValid;
  };

  const handleSubmit = (e) => {
    event.preventDefault();
    setFormData({
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      email: email,
      date_of_birth: dob,
    });
    const isValid = validateStepOneForm();
    if (isValid) {
      setStepTwo(true);
      setStepOne(false);
    }
  };

  const emailValid = (e) => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) {
      setFormErrors({
        ...formErrors,
        email: "Please enter a valid email address",
      });
    } else {
      setEmail(e.target.value);
      setFormErrors({
        ...formErrors,
        email: "",
      });
    }
  };

  const phoneValid = (e) => {
    const phoneRegex =
      /^(\d{3}[-\s]?\d{3}[-\s]?\d{4}|\(\d{3}\)\s*\d{3}[-\s]?\d{4}|\d{10})$/;

    if (!phoneRegex.test(e.target.value)) {
      setFormErrors({
        ...formErrors,
        phone_number: "Invalid phone number",
      });
      return;
    } else {
      setPhone(e.target.value);
      setFormErrors({
        ...formErrors,
        phone_number: "",
      });
    }
  };

  const handleSubmitStepTwo = async (e) => {
    e.preventDefault();

    // Check that all required fields are filled out
    if (!firstName || !lastName || !phone || !email || !dob) {
      setFormErrors("Please fill out all required fields.");
      return;
    }

    const form2Data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      email: email,
      date_of_birth: dob,
    };

    try {
      const response = await axios.post("/save-user-details", form2Data);
      if (response.data.error) {
        setFormErrors(response.data.error);
      } else {
        console.log("User data saved successfully", response);
        setUserName(response.data.user_name || "");
        setUserId(response.data.user_id || "");
        setStepTwo(false);
        setStepFinal(true);
      }
    } catch (error) {
      console.error("Error saving user data", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        {!stepFinal && (
          <div className="row">
            <div className="col-lg-12 p-0">
              <img src="/images/bnr.jpg" alt="" />
            </div>
          </div>
        )}
      </div>
      <div className="container">
        {!stepFinal && (
          <div className="row">
            <div className="offset-lg-1 col-lg-10 col-md-12 col-12 text-center">
              <h1>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </h1>
              <p>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
              </p>
            </div>
            <div className="offset-lg-2 col-lg-8 offset-md-1 col-md-10 col-12 text-center">
              <div className="formpart">
                <form action="">
                  {/* step1 */}
                  {stepOne && (
                    <>
                      {" "}
                      <div id="slide01">
                        <h3>Enter Your Personal Details</h3>

                        <div className="mb-3 text-start">
                          <label
                            htmlFor="FormControlInput1"
                            className="form-label"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            id="FormControlInput1"
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          {formErrors.first_name && (
                            <span style={{ color: "red" }}>
                              {formErrors.first_name}
                            </span>
                          )}
                        </div>
                        <div className="mb-3 text-start">
                          <label
                            htmlFor="FormControlInput2"
                            className="form-label"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            id="FormControlInput2"
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          {formErrors.last_name && (
                            <span style={{ color: "red" }}>
                              {formErrors.last_name}
                            </span>
                          )}
                        </div>
                        <div className="mb-3 text-start">
                          <label
                            htmlFor="FormControlInput3"
                            className="form-label"
                          >
                            Enter Your Date of Birth
                          </label>
                          <fieldset>
                            <legend> Date Of Birth</legend>
                            <div className="row">
                              <div className="form-group col-lg-4 col-md-4 col-sm-4 col-12 ">
                                <select
                                  name="lstDobDay"
                                  id="lstDobDay"
                                  className="form-control watermark"
                                  onChange={(e) => dobCreate(e)}
                                >
                                  <option value="">Day </option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18</option>
                                  <option value="19">19</option>
                                  <option value="20">20</option>
                                  <option value="21">21</option>
                                  <option value="22">22</option>
                                  <option value="23">23</option>
                                  <option value="24">24</option>
                                  <option value="25">25</option>
                                  <option value="26">26</option>
                                  <option value="27">27</option>
                                  <option value="28">28</option>
                                  <option value="29">29</option>
                                  <option value="30">30</option>
                                  <option value="31">31</option>
                                </select>
                                <i
                                  className="validate "
                                  aria-hidden="true"
                                  style={{ display: "none" }}
                                ></i>
                                <span
                                  id="dobDay_err"
                                  className="error_msg error"
                                ></span>
                              </div>
                              <div className="form-group col-lg-4 col-md-4 col-sm-4 col-12 ">
                                <select
                                  name="lstDobMonth"
                                  id="lstDobMonth"
                                  className="form-control watermark"
                                  onChange={(e) => dobCreate(e)}
                                >
                                  <option value="1">January</option>
                                  <option value="2">February</option>
                                  <option value="3">March</option>
                                  <option value="4">April</option>
                                  <option value="5">May</option>
                                  <option value="6">June</option>
                                  <option value="7">July</option>
                                  <option value="8">August</option>
                                  <option value="9">September</option>
                                  <option value="10">October</option>
                                  <option value="11">November</option>
                                  <option value="12">December</option>
                                </select>
                                <i
                                  className="validate "
                                  aria-hidden="true"
                                  style={{ display: "none" }}
                                ></i>
                                <span
                                  id="dobMonth_err"
                                  className="error_msg"
                                ></span>
                              </div>
                              <div className="form-group col-lg-4 col-md-4 col-sm-4 col-12">
                                <select
                                  name="lstDobYear"
                                  id="lstDobYear"
                                  className="form-control"
                                  onChange={(e) => dobCreate(e)}
                                >
                                  <option value="">Year</option>
                                  <option value="2002">2002</option>
                                  <option value="2001">2001</option>
                                  <option value="2000">2000</option>
                                  <option value="1999">1999</option>
                                  <option value="1998">1998</option>
                                  <option value="1997">1997</option>
                                  <option value="1996">1996</option>
                                  <option value="1995">1995</option>
                                  <option value="1994">1994</option>
                                  <option value="1993">1993</option>
                                  <option value="1992">1992</option>
                                  <option value="1991">1991</option>
                                  <option value="1990">1990</option>
                                  <option value="1989">1989</option>
                                  <option value="1988">1988</option>
                                  <option value="1987">1987</option>
                                  <option value="1986">1986</option>
                                  <option value="1985">1985</option>
                                  <option value="1984">1984</option>
                                  <option value="1983">1983</option>
                                  <option value="1982">1982</option>
                                  <option value="1981">1981</option>
                                  <option value="1980">1980</option>
                                  <option value="1979">1979</option>
                                  <option value="1978">1978</option>
                                  <option value="1977">1977</option>
                                  <option value="1976">1976</option>
                                  <option value="1975">1975</option>
                                  <option value="1974">1974</option>
                                  <option value="1973">1973</option>
                                  <option value="1972">1972</option>
                                  <option value="1971">1971</option>
                                  <option value="1970">1970</option>
                                  <option value="1969">1969</option>
                                  <option value="1968">1968</option>
                                  <option value="1967">1967</option>
                                  <option value="1966">1966</option>
                                  <option value="1965">1965</option>
                                  <option value="1964">1964</option>
                                  <option value="1963">1963</option>
                                  <option value="1962">1962</option>
                                  <option value="1961">1961</option>
                                  <option value="1960">1960</option>
                                  <option value="1959">1959</option>
                                  <option value="1958">1958</option>
                                  <option value="1957">1957</option>
                                  <option value="1956">1956</option>
                                  <option value="1955">1955</option>
                                  <option value="1954">1954</option>
                                  <option value="1953">1953</option>
                                  <option value="1952">1952</option>
                                  <option value="1951">1951</option>
                                  <option value="1950">1950</option>
                                  <option value="1949">1949</option>
                                  <option value="1948">1948</option>
                                  <option value="1947">1947</option>
                                  <option value="1946">1946</option>
                                  <option value="1945">1945</option>
                                  <option value="1944">1944</option>
                                  <option value="1943">1943</option>
                                  <option value="1942">1942</option>
                                  <option value="1941">1941</option>
                                  <option value="1940">1940</option>
                                  <option value="1939">1939</option>
                                  <option value="1938">1938</option>
                                  <option value="1937">1937</option>
                                  <option value="1936">1936</option>
                                  <option value="1935">1935</option>
                                  <option value="1934">1934</option>
                                  <option value="1933">1933</option>
                                  <option value="1932">1932</option>
                                  <option value="1931">1931</option>
                                  <option value="1930">1930</option>
                                  <option value="1929">1929</option>
                                  <option value="1928">1928</option>
                                  <option value="1927">1927</option>
                                  <option value="1926">1926</option>
                                  <option value="1925">1925</option>
                                  <option value="1924">1924</option>
                                  <option value="1923">1923</option>
                                  <option value="1922">1922</option>
                                  <option value="1921">1921</option>
                                  <option value="1920">1920</option>
                                  <option value="1919">1919</option>
                                  <option value="1918">1918</option>
                                  <option value="1917">1917</option>
                                  <option value="1916">1916</option>
                                  <option value="1915">1915</option>
                                  <option value="1914">1914</option>
                                  <option value="1913">1913</option>
                                  <option value="1912">1912</option>
                                  <option value="1911">1911</option>
                                  <option value="1910">1910</option>
                                </select>
                                <i
                                  className="validate "
                                  aria-hidden="true"
                                  style={{ display: "none" }}
                                ></i>
                                <span
                                  id="dobYear_err"
                                  className="error_msg"
                                ></span>
                              </div>
                              {formErrors.date_of_birth && (
                                <span style={{ color: "red" }}>
                                  {formErrors.date_of_birth}
                                </span>
                              )}
                              <span
                                id="dob_final_err"
                                className="error_msg"
                              ></span>
                            </div>
                          </fieldset>
                        </div>
                        <div className="mb-3 text-center">
                          <button
                            type="button"
                            className="btn btn-warning next01"
                            onClick={(e) => handleSubmit(e)}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {/* step1 */}
                  {/* step2 */}
                  {stepTwo && (
                    <>
                      {" "}
                      <div id="slide02">
                        <h3>Enter Your Contact Details</h3>
                        <div className="mb-3 text-start">
                          <label
                            htmlFor="FormControlInput4"
                            className="form-label"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="FormControlInput4"
                            placeholder="Email Address"
                            onChange={(e) => emailValid(e)}
                          />
                          {formErrors.email && (
                            <span style={{ color: "red" }}>
                              {formErrors.email}
                            </span>
                          )}
                        </div>
                        <div className="mb-3 text-start">
                          <label
                            htmlFor="FormControlInput5"
                            className="form-label"
                          >
                            Phone Number
                          </label>
                          <input
                            name="phone_number"
                            type="text"
                            className="form-control"
                            id="FormControlInput5"
                            placeholder="Phone Number"
                            onChange={(e) => phoneValid(e)}
                          />
                          {formErrors.phone_number && (
                            <span style={{ color: "red" }}>
                              {formErrors.phone_number}
                            </span>
                          )}
                        </div>
                        <div className="mb-3 text-center">
                          <button
                            type="button"
                            className="btn btn-success"
                            id="submit_claim"
                            onClick={(e) => handleSubmitStepTwo(e)}
                          >
                            Submit
                          </button>
                        </div>
                      </div>{" "}
                    </>
                  )}
                  {/* step2 */}
                </form>
                {/* step3 */}

                {/* step3 */}
              </div>
            </div>
          </div>
        )}
      </div>

      {stepFinal && (
        <PreviousAddress
          userId={userId}
          userName={userName.charAt(0).toUpperCase() + userName.slice(1)}
        />
      )}
    </>
  );
}

export default UserDetails;
