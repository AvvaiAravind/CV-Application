import "./App.css";
import { useState } from "react";
import {
  personal as initialPersonal,
  professional as initialProfessional,
  educational as initialEducational,
} from "./sampleData";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { SiBillboard } from "react-icons/si";

export function App() {
  return <Body />;
}

function Body() {
  const [personal, setPersonal] = useState(initialPersonal);

  const [professional, setProfessioanal] = useState(initialProfessional);

  const [educational, setEducational] = useState(initialEducational);

  function handleChange(e) {
    // e.preventDefault();

    const id = e.target.id;
    let input = e.target.value;
    if (personal.some((item) => item.id === id)) {
      setPersonal((personal) =>
        personal.map((item) =>
          item.id === id ? { ...item, value: input } : item
        )
      );
    } else if (professional.some((item) => item.id === id)) {
      setProfessioanal((professional) =>
        professional.map((item) =>
          item.id === id ? { ...item, value: input } : item
        )
      );
    } else if (educational.some((item) => item.id === id)) {
      setEducational((educational) =>
        educational.map((item) =>
          item.id === id ? { ...item, value: input } : item
        )
      );
    }
  }
  function handleSave(e) {
    const id = e.target.id;

    if (id === "Personal-save") {
      sessionStorage.setItem("personal", JSON.stringify(personal));
    }
  }

  return (
    <>
      <div className="input-section">
        <UserInputSection
          title={"Personal Details"}
          section={personal}
          onChange={handleChange}
          onClick={handleSave}
        />
        <UserInputSection
          title={"Educational Qualification"}
          section={educational}
          onChange={handleChange}
          onClick={handleSave}
        />
        <UserInputSection
          title={"Professional Experience"}
          section={professional}
          onChange={handleChange}
          onClick={handleSave}
        />
      </div>
      <div className="resume-section">
        <Resume
          personal={personal}
          educational={educational}
          professional={professional}
        />
      </div>
    </>
  );
}

function UserInputSection({ title, section, onChange, onClick }) {
  const [personalOpen, setPersonalOpen] = useState(true);
  const [professionalOpen, setProfessioanalOpen] = useState(false);
  const [educationalOpen, setEducationalOpen] = useState(false);
  const id = title.split(" ")[0];

  function dropDown(e) {
    const sibiling = e.currentTarget.previousElementSibling.textContent;
    console.log(sibiling);
    if (sibiling === "Personal Details") {
      setPersonalOpen((prev) => !prev);
    } else if (sibiling === "Educational Qualification") {
      setEducationalOpen((prev) => !prev);
    } else if (sibiling === "Professional Experience") {
      setProfessioanalOpen((prev) => !prev);
    }
  }
  const isVisible =
    (title === "Personal Details" && personalOpen) ||
    (title === "Educational Qualification" && educationalOpen) ||
    (title === "Professional Experience" && professionalOpen);

  return (
    <section className="user-input-sect">
      <div className="header-section">
        <h2>{title}</h2>
        <button type="button" onClick={dropDown}>
          {isVisible ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
      </div>
      {isVisible && (
        <form>
          {section.map((item) => {
            return (
              <div key={item.id} className="input-field">
                <label htmlFor={item.id}>{item.label}</label>
                <input type="text" id={item.id} onChange={onChange} />
              </div>
            );
          })}

          <div className="button-container">
            <button type="button" id={`${id}-save`} onClick={onClick}>
              Save
            </button>
            <button type="button" id={`${id}-edit`} onClick={onClick}>
              Reset
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function Resume({ personal, professional, educational }) {
  return (
    <>
      <div className="personal-section">
        <PersonalSection personal={personal} />
      </div>
      <div className="educational-section">
        <RemainingSection content={educational} title="Education" />
      </div>
      <div className="professional-section">
        <RemainingSection content={professional} title="Experience" />
      </div>
    </>
  );
}

function PersonalSection({ personal }) {
  return <>{personal.map((item) => renderPersonal(item))}</>;
}

function renderPersonal(item) {
  switch (item.label) {
    case "Full Name":
      return <h1 key={item.label}>{item.value}</h1>;
    default:
      return <p key={item.label}>{item.value}</p>;
  }
}

function RemainingSection({ content, title }) {
  return (
    <>
      <h2>{title}</h2>
      {content.map((item) => (
        <p key={item.id} className={item.id}>
          {item.value}
        </p>
      ))}
    </>
  );
}
