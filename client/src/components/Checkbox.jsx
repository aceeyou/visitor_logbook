import { useEffect, useState } from "react";

export default function Checkbox({ content, setFormdata, submitting }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (submitting === false) {
      setIsChecked(false);
    }
  }, [submitting]);

  function handleOnClick() {
    // toggles the chech state
    setIsChecked(!isChecked);

    // toggles the request for incentives state
    if (content === "Request on Incentives for...") {
      setFormdata((old) => ({
        ...old,
        requestIncentives: isChecked ? "" : "a",
      }));
      return;
    }

    // toggles the submit research document state
    if (content === "Submit Research Document/s") {
      setFormdata((old) => ({ ...old, submitDocs: isChecked ? "" : "a" }));
      return;
    }

    // updates and collect the purpose state of the visitor
    setFormdata((prevData) => {
      let updatedPurposes = prevData.purpose
        ? prevData.purpose.split(", ")
        : [];
      if (!isChecked) {
        // If checking the box, add the content
        updatedPurposes.push(content);
      } else {
        // If unchecking the box, remove the content
        updatedPurposes = updatedPurposes.filter((item) => item !== content);
      }
      return { ...prevData, purpose: updatedPurposes.join(", ") };
    });
  }
  return (
    <button
      type="button"
      onClick={handleOnClick}
      className="checkbox-btn"
      style={{
        width: "100%",
        textAlign: "left",
        color: "black",
        fontSize: "14px",
      }}
    >
      <span>{isChecked ? "✅" : "⬜️"}</span>
      <span style={{ paddingLeft: "10px", width: "100%" }}>{content}</span>
    </button>
  );
}
