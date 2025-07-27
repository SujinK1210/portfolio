import styled from "styled-components";
import WorkCard from "./WorkCard";

export default function WorkGrid({ projects, activeFilter, onProjectClick }) {
  const filteredProjects =
    activeFilter === "ALL"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter));

  // Debug logging
  console.log("Active Filter:", activeFilter);
  console.log("All Projects:", projects);
  console.log("Filtered Projects:", filteredProjects);

  return (
    <Grid>
      {filteredProjects.length === 0 ? (
        <NoResults>No projects found for "{activeFilter}"</NoResults>
      ) : (
        filteredProjects.map((project) => (
          <WorkCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick(project)}
          />
        ))
      )}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 4rem 5rem;
  width: 100%;
  margin-top: 520px;
  padding: 0 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    margin-top: 31.67vw; /* ~380px at 1200px width */
    justify-items: center;
    align-items: center;
  }
  @media (max-width: 768px) {
  }
`;

const NoResults = styled.div`
  font-family: "museo-sans", sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: #ccc;
  text-align: center;
  grid-column: 1 / -1;
  padding: 4rem 0;
`;
