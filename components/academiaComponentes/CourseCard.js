// import React from "react"
// import { Card, Badge } from "react-bootstrap"
// import styled from "styled-components"
// import StyledLink from "../common/StyledLink"

// const StyledCard = styled(Card)`
//   border-radius: 50px;
//   border: none;
//   box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;

//   > div.card-header {
//     font-weight: bold;
//     font-family: Arial, Helvetica, sans-serif;
//     background: lightgray;
//     border-bottom: none;
//     padding: 30px 20px;
//     border-radius: 50px 50px 0px 0px;
//     text-transform: uppercase;
//   }

//   > div.card-footer {
//     font-weight: bold;
//     background: transparent;
//     border-top: none;
//   }
//   > p.card-text {
//     font-size: 12px;
//   }
//   > p.card-text > strong {
//     /* font-weight: bold !important; */
//     color: blue;
//     background-color: black;
//   }
// `
// const StyledButton = styled(StyledLink)`
//   background-color: transparent;
//   color: black;
// `

// const CourseCard = ({
//   name,
//   price,
//   place,
//   date,
//   description,
//   teacher,
//   path,
//   index,
//   modalidad,
// }) => {
//   console.log(modalidad)
//   return (
//     <div className="col mb-4">
//       <StyledCard border="primary" className="mt-5">
//         <Card.Header className="text-center">{name}</Card.Header>
//         <Card.Body>
//           <div className="text-left">
//             <b>Descripción: </b>
//             {description}
//             <br />
//             <b>Inversion: </b>
//             {price}
//             <br />
//             <b>Lugar: </b>
//             {place}
//             <br />
//             <b>Fecha: </b>
//             {!modalidad ? (
//               <>
//                 <Badge pill variant="danger">
//                   Presencial no disponible
//                 </Badge>

//                 <br />
//                 {index < 2 ? (
//                   <Badge pill variant="success">
//                     Online disponible
//                   </Badge>
//                 ) : (
//                   <Badge pill variant="danger">
//                     Online no disponible
//                   </Badge>
//                 )}
//               </>
//             ) : (
//               date
//             )}
//             <br />
//             <b>Teacher: </b>
//             {teacher}
//           </div>
//         </Card.Body>
//         <Card.Footer className="d-flex justify-content-center">
//           <StyledButton to={path}>{">"} VER DETALLES</StyledButton>
//         </Card.Footer>
//       </StyledCard>
//     </div>
//   )
// }

// export default CourseCard
