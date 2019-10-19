import styled from "styled-components";

export const Container = styled.div`
body {margin: 0;}

.navbar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #da552f;
}

.navbar__link {float: left;}

.navbar__link {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.navbar__link:hover:not(.active) {background-color: #444;}

.navbar__link.active {background-color: #4CAF50;}

.navbar__link.right {float: right;}

@media screen and (max-width: 600px) {
  .navbar__link.right, 
  .navbar__link {float: none;}
}

.navbar__link--active {
  border-bottom: 3px solid #777;
  transition: border-bottom .5s ease-in-out;
  background-color: #111;
}
`;
