"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "../../components/datatable";
import Modal from "../../components/modal";

function Machines() {
  const [machines, setMachines] = useState([
    {
      id: 1,
      image:
        "https://tse2.mm.bing.net/th?id=OIP.ucnOd4coGtVdRBljPYGJCgHaEK&pid=Api&P=0&h=180",
      machineId: "MID001",
      machine: "Machine 1",
      client: "Client 1",
      location: "Location 1",
      status: "assigned",
      added: "2024-01-01",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMachine, setNewMachine] = useState({
    image: "",
    machineId: "",
    machine: "",
    client: "",
    location: "",
    status: "assigned",
    added: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNewMachine = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    setNewMachine({
      image: "",
      machineId: "",
      machine: "",
      client: "",
      location: "",
      status: "assigned",
      added: "",
    });
  };

  const handleSaveMachine = () => {
    if (isEditing) {
      setMachines(
        machines.map((machine) =>
          machine.id === newMachine.id ? newMachine : machine
        )
      );
    } else {
      const maxId = machines.reduce(
        (max, machine) => Math.max(max, machine.id),
        0
      );
      setMachines([...machines, { id: maxId + 1, ...newMachine }]);
    }
    setIsModalOpen(false);
    setNewMachine({
      image: "",
      machineId: "",
      machine: "",
      client: "",
      location: "",
      status: "assigned",
      added: "",
    });
  };

  const handleEditMachine = (machine) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setNewMachine(machine);
  };

  const handleDeleteMachine = (machine) => {
    setMachines(machines.filter((m) => m.id !== machine.id));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMachine({ ...newMachine, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const columns = [
    { Header: "#", accessor: "id" },
    {
      Header: "Image",
      accessor: "image",
      Cell: ({ value }) => (
        <img className="h-10 w-12 object-cover" alt="machine" src={value} />
      ),
    },
    { Header: "Machine ID", accessor: "machineId" },
    { Header: "Machine", accessor: "machine" },
    { Header: "Client", accessor: "client" },
    { Header: "Location", accessor: "location" },
    { Header: "Status", accessor: "status" },
    { Header: "Added", accessor: "added" },
  ];

  return (
    <>
      <div className="min-h-[90vh]">
        <div className="flex justify-between items-center p-4">
          <div className="text-black font-bold text-2xl p-2">All Machines</div>
          <div className="flex gap-1">
            <Button onClick={handleAddNewMachine} className="bg-blue-950">
              Add New Machine
            </Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={machines}
          editUrl={handleEditMachine}
          onDelete={handleDeleteMachine}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-out scale-95 p-6 w-full max-w-sm">
            <div className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Machine" : "Add New Machine"}
            </div>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {newMachine.image && (
                <img
                  src={newMachine.image}
                  alt="New machine"
                  className="h-20 w-24 object-cover"
                />
              )}
              <input
                type="text"
                placeholder="Machine ID"
                value={newMachine.machineId}
                onChange={(e) =>
                  setNewMachine({ ...newMachine, machineId: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Machine"
                value={newMachine.machine}
                onChange={(e) =>
                  setNewMachine({ ...newMachine, machine: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Client"
                value={newMachine.client}
                onChange={(e) =>
                  setNewMachine({ ...newMachine, client: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Location"
                value={newMachine.location}
                onChange={(e) =>
                  setNewMachine({ ...newMachine, location: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="date"
                placeholder="Added"
                value={newMachine.added}
                onChange={(e) =>
                  setNewMachine({ ...newMachine, added: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <select
                value={newMachine.status}
                onChange={(e) =>
                  setNewMachine({ ...newMachine, status: e.target.value })
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="assigned">Assigned</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveMachine} className="bg-blue-950">
                {isEditing ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Machines;
