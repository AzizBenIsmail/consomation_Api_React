import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { MdSettingsVoice } from "react-icons/md";
import { useParams } from "react-router-dom";

// components
import { updatContact, getContactsid } from "../../Services/ApiContact";

export default function Settings() {
  const [Contact, setContact] = useState({ fullName: "", phone: "" });
  const history = useHistory();
  const param = useParams();
  const id = param.id;
  const handlechange = (e) => {
    setContact({ ...Contact, [e.target.name]: e.target.value });
    console.log(Contact);
  };

  const getContact = async () => {
    await getContactsid(id)
      .then((res) => {
        console.log(res);
        setContact(res.data.contact);
        console.log(Contact);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  

  // function validate(phone) {
  //   return /^\d{8}/.test(phone);
  // }

  const update = async (Contact) => {
    try {
      const res = await updatContact(id, Contact);
      console.log("Contact added successfully");
      history.push("/admin/tables");
    } catch (err) {
      console.error("Error updating contact:", err);
    }
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
            <button
                  className="mr-3 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(e) => getContact()}
                >
                  Get user
                </button>
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  My account
                </h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(e) => update(Contact)}
                >
                  update
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        FullName
                      </label>
                      <input
                        type="text"
                        value={Contact.fullName}
                        name="fullName"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={(e) => handlechange(e)}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="phone"
                        value={Contact.phone}
                        pattern="\d{8}"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={(e) => handlechange(e)}
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
