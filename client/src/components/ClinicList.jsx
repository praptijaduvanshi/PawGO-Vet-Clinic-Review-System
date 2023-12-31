import React, { useEffect, useContext } from "react";
import ClinicFinder from "../apis/ClinicFinder";
import { ClinicsContext } from "../context/ClinicsContext";
import {useNavigate} from "react-router-dom";
import StarRating from "./StarRating";


const ClinicList = (props) => {
  const {clinics, setClinics} = useContext(ClinicsContext)
  let navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await ClinicFinder.get("/");
      setClinics(response.data.data.clinics);
    } catch (error) {}
    };
    fetchData();
  }, []);

  const handleDelete = async (e,id) => {
    e.stopPropagation()
    try {
      const response = await ClinicFinder.delete(`/${id}`)
      setClinics(clinics.filter(clinic => {
        return clinic.id !== id
      }))
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (e,id) => {
    e.stopPropagation()
    navigate(`/clinics/${id}/update`)
  };

  const handleClinicSelect = (id) => {
    navigate(`/clinics/${id}`)
  };

  const renderRating = (clinic) => {
    if (!clinic.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={clinic.average_rating} />
        <span className="text-warning ml-1">({clinic.count})</span>
      </>
    );
  };

  return (
    <div className="list-group" style={{ margin: '7px' }}>
      <table className="table table-hover table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col"> Clinic Name</th>
            <th scope="col"> Address</th>
            <th scope="col"> City</th>
            <th scope="col"> State</th>
            <th scope="col"> Open Hours</th>
            <th scope="col"> Phone No.</th>
            <th scope="col"> Email</th>
            <th scope="col"> Established On</th>
            <th scope="col"> Ratings</th>
            <th scope="col"> Edit</th>
            <th scope="col"> Delete</th>
          </tr>
        </thead>

        <tbody>
          {clinics && clinics.map((clinic) => {
            return (
            <tr onClick={() => {handleClinicSelect(clinic.id)}} key={clinic.id}>
              <td>{clinic.name}</td>
              <td>{clinic.address}</td>
              <td>{clinic.city}</td>
              <td>{clinic.state}</td>
              <td>{clinic.open_hours}</td>
              <td>{clinic.phone_number}</td>
              <td>{clinic.email}</td>
              <td>{clinic.established_date}</td>
              <td>{renderRating(clinic)}</td>
              <td><button onClick={(e) => handleUpdate(e, clinic.id)} className="btn btn-info">Edit</button></td>
              <td><button onClick={(e) => handleDelete(e, clinic.id)} className="btn btn-danger">Delete</button></td>
            </tr>
            );
          })}
          {/*<tr>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td>A</td>
            <td><button className="btn btn-info">Edit</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr>*/}
        </tbody>
      </table>
    </div>
  );
};

export default ClinicList;