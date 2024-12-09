import { useEffect, useState } from "react";

export default function Programs() {
  interface Program {
    id: number;
    title: string;
    poster: string;
    synopsis: string;
    country: string;
    year: number;
  }

  const [programs, setPrograms] = useState<Program[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${API_URL}/api/programs`);
        console.info(response);
        const data = await response.json();

        setPrograms(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div>
      {programs.map((program) => (
        <div key={program.id}>
          <h2>{program.title}</h2>
          <img src={program.poster} alt={program.title} />
          <p>{program.synopsis}</p>
          <p>
            {program.country} - {program.year}
          </p>
        </div>
      ))}
    </div>
  );
}
