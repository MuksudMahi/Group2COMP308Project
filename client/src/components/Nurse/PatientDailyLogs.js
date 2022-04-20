import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import NavBar from "../Nav/Nav";
import {gql} from "@apollo/client";
import { useQuery,useMutation } from "@apollo/client";
import { useAuthToken, useAuthUserToken,useAuthRoleToken } from "../../config/auth";


export const getVitalHistory = gql`
query daily($nurse:ID!) {
    findDailyLogsByNurse(nurse:$nurse) {
      _id,
      pulse,
      bloodPressure,
      weight,
      bodyTemperature,
      respiratoryRate,
      nurse,
      patient,
      created
    }
  }  
`;

function VitalHistory(props) {
    const [authUserToken] = useAuthUserToken();

    const {data,loading} = useQuery(getVitalHistory,{
        variables: {
            nurse: authUserToken
        }
    });

    console.log(data)

    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    return (
        <div>
        <NavBar />
        <div className="container-fluid col-12 justify-content-center margins">
            <div className="span12 div-style p-10">
                <div className="bg-danger text-light title">
                <h2 className="h2-style">Search Patient Daily Logs</h2>
                </div>
                <br />
                <br />
                
                {showLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}

                <div className="container-fluid margins">
                    {showError && (
                        <span>
                        There is something wrong...
                        </span>
                    )}
                    <div className="p-10">
                        <table className="table table-danger">
                            <thead className="thead-dark">
                                <tr>
                                    <th>No.</th>
                                    <th>Body Temperature</th>
                                    <th>Weight</th>
                                    <th>Pulse</th>
                                    <th>Blood Pressure</th>
                                    <th>Respiratory Rate</th>
                                    <th>Patient ID</th>
                                    <th>Date</th>
                                </tr>
                                </thead>

                                {
                                    !loading && <tbody className="tr p-10">
                                        {
                                            data.findDailyLogsByNurse.map((item, index) => {
                                                return (
                                                    <tr key={item._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.bodyTemperature}</td>
                                                        <td>{item.weight}</td>
                                                        <td>{item.pulse}</td>
                                                        <td>{item.bloodPressure}</td>
                                                        <td>{item.respiratoryRate}</td>
                                                        <td>{item.patient}</td>
                                                        <td>{item.created}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                }
                            </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default (VitalHistory);