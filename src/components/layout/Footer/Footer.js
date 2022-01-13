import styled from "styled-components";
export const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <h6>@Dieses Projekt wurde für Produkte Verwaltung erstellt.</h6>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-pastel-gray);
  line-height: 2;
  @media (max-width: 576px) {
    h6 {
      font-size: 0.8rem;
    } 
  }
`;
