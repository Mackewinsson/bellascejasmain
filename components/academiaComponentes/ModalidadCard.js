// import React from "react"
// import { Card, Badge } from "react-bootstrap"
// import styled from "styled-components"
// import StyledButton from "../common/Button"
// import WebpPay from "../img/webpay"

// const StyledCard = styled(Card)`
//   border-radius: 25px;

//   &:hover {
//     box-shadow: 1px 1px 2px black, 0 0 25px gray, 0 0 5px darkgray;
//     transition: boxShadow 2s;
//   }

//   > div.card-header {
//     font-weight: bold;
//   }

//   > p.card-text {
//     font-size: 12px;
//   }
//   > div.card-header {
//     border-radius: 25px 25px 0 0;
//   }
// `

// const ModalidadCard = ({
//   name,
//   date,
//   place,
//   time,
//   daysOfAccess,
//   maxStudents,
//   price,
//   bullets,
//   teacher,
//   courseName,
//   id,
//   link,
//   index,
//   disponiblidad,
// }) => {
//   return (
//     <div className="col mb-4">
//       <StyledCard border="primary" className="mt-5">
//         <Card.Header className="text-uppercase font-weight-bold" id={`${id}`}>
//           <small>
//             <span class="badge bg-dark text-light">{index}</span>
//             {` ${name} `}
//             <Badge pill variant={disponiblidad ? "success" : "danger"}>
//               {disponiblidad ? "disponible" : "No disponible"}
//             </Badge>{" "}
//           </small>
//         </Card.Header>
//         <Card.Body>
//           <h6 className="mb-4">Beneficios</h6>
//           <ul className="text-left">
//             {bullets.map(el => {
//               return <li key={el}>{el}</li>
//             })}
//           </ul>
//           <br />

//           <h6 className="mb-4">Detalles</h6>
//           {/* <small className="text-muted text-left"> */}
//           <small>
//             <ul className="list-group text-left">
//               <li>Máximo de estudiantes: {maxStudents}</li>
//               <li>Acceso: {daysOfAccess}</li>
//               <li>Lugar: {place}</li>
//               <li>Horario: {time}</li>
//               <li>Profesora: {teacher}</li>
//               <li>Inversion: ${price}</li>
//               {id === "grupalgold" || id === "oneonone" ? (
//                 <li>
//                   Fecha:{" "}
//                   {disponiblidad ? (
//                     date
//                   ) : (
//                     <Badge pill variant="danger">
//                       No disponible
//                     </Badge>
//                   )}
//                 </li>
//               ) : (
//                 <li>Fecha: Comienza hoy mismo</li>
//               )}
//             </ul>
//           </small>
//           <StyledButton
//             href={`https://api.whatsapp.com/send?phone=56949363030&text=Quiero mas informacion del curso de ${courseName} [${name}] Bellas Cejas Academy`}
//             target="_blank"
//             rel="noreferrer"
//             className="btn btn-outline-info mb-4"
//           >
//             + Información
//           </StyledButton>
//         </Card.Body>
//         <Card.Footer className="d-flex justify-content-center">
//           <WebpPay name="webpay" />

//           <StyledButton
//             href={link}
//             target="_blank"
//             rel="noreferrer"
//             className="btn btn-outline-warning"
//           >
//             Matricularse
//           </StyledButton>
//         </Card.Footer>
//       </StyledCard>
//     </div>
//   )
// }

// export default ModalidadCard
