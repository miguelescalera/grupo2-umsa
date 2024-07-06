import { Box, Button } from "@mui/material";
import DataTable, { TableColumn } from "react-data-table-component";
import Layout from "../Layout/Layout";
import { TurnoType } from "../Interfaces/interfaces";
import { useEffect, useState } from "react";
import { getTurns } from "../../services/services";
import ModalProducts from "../Table/ModalProducts"

const TurnoMedico = () => {
    const [title, setTitle] = useState("");

    const [turnos, setTurnos] = useState<TurnoType[] | any>();

    const [operacion, setOperacion] = useState(0);
    const [turno, setTurno] = useState<TurnoType>();
    
      useEffect(() => {
        getTurns()
            .then((response) => {
              setTurnos(response);
            })
            .catch(error => {
              console.error('Error al obtener los turnos:', error); 
            });
      }, []);


    const cambiarTitle = (op : number) => {
        setOperacion(op);
        if(op === 1){
          /*setProduct({
            codigo_producto: 0,
            cantidad_disponible: 0,
            costo: '',
            marca: '',
            nombre: ''
          });*/
          setTitle("Registrar Producto");
        }else if(op === 2){
          setTitle("Editar Producto");
        }
      }

    const colums: TableColumn<TurnoType>[] = [
        // {
        //   name: "Codigo",
        //   selector: (row : TurnoType) => String(row.id),
        //   sortable: true
        // },
          {
            name: "Profesional",
            selector: (row : TurnoType) => String(row.profesional?.nombreProfesional),
            sortable: true
          },
          {
            name: "Paciente",
            selector: (row : TurnoType) => String(row.paciente?.nombre),
            sortable: true
          },
          {
            name: "Fecha",
            selector: (row : TurnoType) => String(row.fechaHora),
            sortable: true
          },
        //   {
        //     name: "Dia",
        //     selector: (row : TurnoType) => String(row.horarioConsulta.dia),
        //     sortable: true
        //   },
        //   {
        //     name: "Horario",
        //     selector: (row : TurnoType) => String(row.horarioConsulta.horario),
        //     sortable: true
        //   },
          {
            name: "MotivoConsulta",
            selector: (row : TurnoType) => String(row.motivoConsulta),
            sortable: true
          },
    
            {
              name: "Operacion",
              cell: (row : TurnoType) => (
                <div>
                  <Button onClick={() => handleEdit(row)} data-bs-toggle="modal" data-bs-target="#modalProducts">Modificar</Button>
                  <Button onClick={() => handleDelete(row)} >Eliminar</Button>
                </div>    
              ),
              ignoreRowClick: true,
              allowOverflow: true,
              button: true,
            }
        ]

        const handleEdit = (row : TurnoType) => {
            setTurno(row);
            //cambiarTitle(2);
            console.log("Editar:", row);
        };
        
          const handleDelete = (row : TurnoType) => {
            //enviarSolicitud(row ,'DELETE');
            console.log("Eliminar:", row);
          };
    
  return (
    <Layout>
        <Box sx={{mt: 5, backgroundColor: '#ffffffdb', color: 'black', borderRadius: 2, width: 1000, height: 500}}>
            <h1>Turno Medico</h1>
            <div className="showProducts">
                <div className="container-fluid">
                  <div className="row mt-3">
                      <div className="col-md-4 offset-md-4">
                        {/*Boton Añadir producto*/}
                        <div className="d-grid mx-auto">
                            <ModalProducts/>
                        </div>
                      </div>
                  </div>
                    {/*Tabla de productos*/}
                  <div className="row mt-3">
                    <div className="col-12 col-lg-12 offset-0 offset-lg-0">
                      <div className="table-responsive">
                          <DataTable 
                              columns={colums} 
                              data={turnos}
                              pagination
                              fixedHeader
                              theme="dark"
                            />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </Box>
    </Layout>
  )
}

export default TurnoMedico
