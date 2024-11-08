import "./App.css";
import { useState } from "react";
import {
  personal as initialPersonal,
  professional as initialProfessional,
  educational as initialEducational,
} from "./sampleData";
import { IoIosArrowDown } from "react-icons/io";

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
    const parent = e.target..

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
          professional={professional}
          educational={educational}
        />
      </div>
    </>
  );
}

function UserInputSection({ title, section, onChange, onClick }) {
  return (
    <section className="user-input-sect">
      <div className="header-section">
        <h2>{title}</h2>
        <button type="button">
          <IoIosArrowDown />
        </button>
      </div>
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
          <button type="button" onClick={onClick}>
            Save
          </button>
          <button type="button" onClick={onClick}>
            Reset
          </button>
        </div>
      </form>
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
