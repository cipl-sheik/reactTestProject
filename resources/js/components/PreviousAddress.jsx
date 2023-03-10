import { useState, useEffect } from "react";
import axios from "axios";

function PreviousAddress(props) {
  const { userName, userId } = props;
  const [addresses, setAddresses] = useState([{}]);
  const [thankYouSection, setThankYouSection] = useState(false);
  const [previousAddress, setPreviousAddress] = useState(false);
  const [stepThree, setStepThree] = useState(true);

  const handleAddAddress = () => {
    setAddresses([...addresses, { line1: "", line2: "", line3: "" }]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`/users/${userId}/address`, { addresses })
      .then((response) => {
        console.log(response.data);
        setThankYouSection(true);
        setPreviousAddress(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeAddress = () => {
    setAddresses(addresses.slice(0, -1));
  };

  const handleRadioChange = (e) => {
    if (e.target.value === "yes") {
      setStepThree(false);
      setPreviousAddress(true);
    } else {
      setStepThree(false);
      setPreviousAddress(false);
      setThankYouSection(true);
    }
  };
  const handleBackPage = () => {
    setStepThree(!stepThree);
    setPreviousAddress(!previousAddress);
  };
  return (
    <>
      {/* step3 */}
      {!thankYouSection && (
        <div className="offset-lg-1 col-lg-10 col-md-12 col-12 text-center">
          <h1>
            Hi <span>{userName}</span> Lorem Ipsum is simply dummy text of the
            printing and typesetting industry.
          </h1>
          <p>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      )}
      {stepThree && (
        <>
          <div className="container">
            <div className="row">
              <div className="offset-lg-2 col-lg-8 offset-md-1 col-md-10 col-12 text-center">
                <div className="formpart">
                  <form action="">
                    <div id="slide03" style={{ display: "block" }}>
                      <h3>Do you have a Previous Address?</h3>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="hasPreviousAddress"
                          id="flexRadioDefault1"
                          value="yes"
                          onChange={handleRadioChange}
                        />
                        <label
                          className="form-check-label next02"
                          htmlFor="flexRadioDefault1"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="hasPreviousAddress"
                          id="flexRadioDefault2"
                          value="no"
                          onChange={handleRadioChange}
                        />
                        <label
                          className="form-check-label tothank"
                          htmlFor="flexRadioDefault2"
                        >
                          No
                        </label>
                      </div>
                    </div>{" "}
                  </form>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      )}
      {previousAddress && (
        <>
          <div className="container">
            <div className="row">
              <div className="offset-lg-2 col-lg-8 offset-md-1 col-md-10 col-12 text-center">
                <div className="formpart">
                  <form action="">
                    <div id="slide04" style={{ marginTop: "40px" }}>
                      <h3>Enter your Previous Address</h3>

                      {addresses.length > 0 &&
                        addresses.map((address, index) => (
                          <div className="mb-3 text-start" key={index}>
                            <label className="form-label">
                              Previous Address {index + 1}
                            </label>
                            <input
                              type="text"
                              className="form-control mb-3"
                              name={`addresses[${index}][line1]`}
                              placeholder="Address line 1"
                              value={address.line1}
                              onChange={(event) => {
                                const newAddresses = [...addresses];
                                newAddresses[index].line1 = event.target.value;
                                setAddresses(newAddresses);
                              }}
                            />
                            <input
                              type="text"
                              className="form-control mb-3"
                              name={`addresses[${index}][line2]`}
                              placeholder="Address line 2"
                              value={address.line2}
                              onChange={(event) => {
                                const newAddresses = [...addresses];
                                newAddresses[index].line2 = event.target.value;
                                setAddresses(newAddresses);
                              }}
                            />
                            <input
                              type="text"
                              className="form-control mb-3"
                              name={`addresses[${index}][line3]`}
                              placeholder="Address line 3"
                              value={address.line3}
                              onChange={(event) => {
                                const newAddresses = [...addresses];
                                newAddresses[index].line3 = event.target.value;
                                setAddresses(newAddresses);
                              }}
                            />
                          </div>
                        ))}
                      <div className="mb-3 text-center" id="submitoradd01">
                        <button
                          type="button"
                          className="btn btn-success tothank"
                          style={{ margin: "20px" }}
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                        <p
                          id="showadrs2"
                          onClick={handleAddAddress}
                          style={{
                            color: "#0a58ca",
                            fontSize: "20px",
                            textDecoration: "underline",
                          }}
                        >
                          {" "}
                          Add Another Address
                        </p>
                        {addresses.length > 1 && (
                          <p
                            id="remove3"
                            onClick={() => removeAddress()}
                            style={{
                              color: "#0a58ca",
                              fontSize: "20px",
                              textDecoration: "underline",
                            }}
                          >
                            Remove Address
                          </p>
                        )}
                        <p
                          id="back02"
                          onClick={handleBackPage}
                          style={{
                            color: "#0a58ca",
                            fontSize: "20px",
                            textDecoration: "underline",
                          }}
                        >
                          &lt;&lt; Back
                        </p>
                      </div>
                    </div>{" "}
                  </form>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      )}
      {/* step3 */}
      {thankYouSection && (
        <>
          {" "}
          <div className="container">
            <div className="row">
              <div className="offset-lg-1 col-lg-10 col-md-12 col-12 text-center">
                <h2>Thankyou...</h2>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged.
                </p>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PreviousAddress;
