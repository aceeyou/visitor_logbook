import React, { useEffect } from "react";
import RequiredTag from "./RequiredTag";
import FormDropdown from "./FormDropdown";
import { RiseLoader } from "react-spinners";
import Checkbox from "./Checkbox";

// Maybe allow multiple purpose of visit for more flexibility
// for users not to type their purposes

export default function NewVisitorForm({
  formdata,
  setFormdata,
  handleSubmitAPI,
  setExpanded,
  submitting,
  setSubmitting,
  formBtn,
}) {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  let dateToday = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",
  });

  // Add or edit the selection for the purpose dropdown on the form
  const purposeOptions = [
    // " -- Select Purpose --",
    "Submit Research Document/s",
    "Claiming of Documents",
    "Request for Honorarium",
    "Request on Incentives for...",
    "Consultation",
    "Other",
  ];

  // Add or edit document options for the dropdown
  const researchDocumentOptions = [
    " -- Select Document --",
    "Research Proposal/Compliance",
    "Accomplishment Report",
    "Terminal Report",
  ];

  //
  const incentiveOptions = [
    "-- Select Incentive --",
    "Publication",
    "Presentation",
    "Citation",
  ];

  // Get the current time
  useEffect(() => {
    // This function will run once when the component mounts
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update the time every 1000ms (1 second)

    // The return function runs when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="new-visitor-form">
      <div className="visitor-top">
        <button
          className="view-time-out-table-btn"
          type="button"
          onClick={() => setExpanded(true)}
        >
          Click here to Log Out
        </button>
        <p className="date-time">
          {dateToday} -{" "}
          {currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <h1
        className={`welcome-header`}
        // style={{ fontSize: formdata.purpose ? "2rem" : "3em" }}
      >
        Welcome to the Office of
      </h1>
      <h1
        className="welcome-header-2"
        // style={{ fontSize: formdata.purpose ? "2rem" : "3em" }}
      >
        Research and Development!
      </h1>
      <p>
        Please fill out the{" "}
        <b>
          <em>Visitor E-Log form</em>
        </b>{" "}
        to register as a new visitor.
      </p>

      <form onSubmit={handleSubmitAPI}>
        <div className="inline-input-grp">
          <div className="input-grp">
            <label htmlFor="name">
              Name <RequiredTag />
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Write your full name here"
              autoFocus
              autoComplete="off"
              value={formdata.name}
              onChange={(e) =>
                setFormdata((old) => ({ ...old, name: e.target.value }))
              }
            />
          </div>
          <div className="input-grp">
            <label htmlFor="affiliation">
              Affiliation <RequiredTag />
            </label>
            <input
              type="text"
              name="affiliation"
              id="affiliation"
              placeholder="College/Campus/Agency..."
              autoComplete="off"
              value={formdata.affiliation}
              onChange={(e) =>
                setFormdata((old) => ({ ...old, affiliation: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="input-grp">
          <label htmlFor="purpose">
            {`Purpose (select all that may apply)`} <RequiredTag />
          </label>
          <div className="purpose-checkbox-container">
            {purposeOptions.map((option, index) => (
              <Checkbox
                content={option}
                key={index}
                setFormdata={setFormdata}
                submitting={submitting}
              />
            ))}
          </div>
        </div>

        {/* Shows the particulars input field */}
        {formdata.purpose.includes("Other") ||
        formdata.purpose.includes("Claiming of Documents") ||
        formdata.purpose.includes("Request for Honorarium") ? (
          <div className="input-grp">
            <label htmlFor="particulars">
              Particulars of Honorarium Claims/Claiming of Documents/Other
              purposes of visit {""}
              <RequiredTag />
            </label>
            <input
              type="text"
              name="particulars"
              id="particulars"
              value={formdata.particulars}
              autoComplete="off"
              placeholder="Write the details/title..."
              onChange={(e) =>
                setFormdata((old) => ({
                  ...old,
                  particulars: e.target.value,
                }))
              }
            />
          </div>
        ) : null}

        {/* Selective type of incentive */}
        {formdata.requestIncentives && (
          <FormDropdown
            label="Request for Incentives for..."
            optionList={incentiveOptions}
            formdata={formdata}
            setFormdata={setFormdata}
          />
        )}

        {/* Submit Research Document */}
        {formdata.submitDocs && (
          <FormDropdown
            label="Submit Document/s"
            optionList={researchDocumentOptions}
            formdata={formdata}
            setFormdata={setFormdata}
          />
        )}

        {/* <p>
          {formdata.purpose}
          {formdata.requestIncentives}, {formdata.submitDocs},{" "}
          {formdata.particulars}
        </p> */}
        <div className="input-grp-btn" onClick={() => setSubmitting(true)}>
          <button
            ref={formBtn}
            type="submit"
            style={{
              backgroundColor: submitting ? "gray" : "var(--sorsu_red)",
              cursor: submitting ? "none" : "pointer",
            }}
          >
            {submitting ? <RiseLoader color="#ffffff" size={10} /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
