import React from "react";

interface SaverProps {
  view: boolean;
  onCancel: () => void;
  onSave: () => void;
}

/**
 * The `Saver` component is used to prompt the user about unsaved changes.
 *
 * Usage:
 *
 * <Saver
 *   view={boolean} // Control the visibility of the Saver component. Pass `true` to show the component.
 *   onCancel={function} // Callback function to handle the cancel action. Typically hides the Saver component.
 *   onSave={function} // Callback function to handle the save action. Typically hides the Saver component.
 * />
 *
 * Example:
 *
 * const [save, setSave] = useState<boolean>(false);
 *
 * const handleCancel = () => {
 *   console.log("User canceled");
 *   setSave(false);
 * };
 *
 * const handleSave = () => {
 *   console.log("User saved changes");
 *   setSave(false);
 * };
 *
 * return (
 *   <div>
 *     <button onClick={() => setSave(true)}>Show Saver</button>
 *     <Saver
 *       view={save}
 *       onCancel={handleCancel}
 *       onSave={handleSave}
 *     />
 *   </div>
 * );
 */

const Saver: React.FC<SaverProps> = ({ view, onCancel, onSave }) => {
  return (
    <div
      className={`confo row animate__animated ${
        view ? "animate__fadeInUp" : "hidden"
      }`}
    >
      <div className="col-md-6 col-sm-6 confoText">
        Careful — you have unsaved changes!
      </div>
      <div className="col-md-6 col-sm-6 confoButtons">
        <button type="button" className="unsaved__close-btn" onClick={onCancel}>
          Cancel
        </button>
        <div
          className="unsaved__save-btn gap-2"
          style={{ position: "relative" }}
          onClick={onSave}
        >
          Save Changes
        </div>
      </div>
    </div>
  );
};

export default Saver;
