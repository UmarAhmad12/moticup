"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { updateAssets, getAssets } from "../../services/assetsService";

function EditInspection() {
  const [inspectionData, setInspectionData] = useState({
    asset_id: "",
    question: "",
    value: "",
    remark: "",
  });
  const { id: assetId } = useParams();
  console.log(assetId);

  const [asset, setAsset] = useState([]);
  
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { data: response } = await getAssets();
        // console.log("inspection", response);
        const { data: assets } = response;

        if (assets.length > 0) {
          console.log("assets", assets);

          setAsset(assets);
          // setIsLoader(false);
        }
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          console.log("Server Busy");
        } else if (ex.response && ex.response.status === 404) {
          console.log("Server Down, Under maintenance.");
        } else {
          console.log("Unexpected Error");
        }
      }
    };

    fetchAssets();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInspectionData({
      ...inspectionData,
      [name]: value,
    });
  }

  async function submitInspection(event) {
    event.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("asset_id", inspectionData.asset_id);
    formDataObj.append("questions[0][question]", inspectionData.question);
    formDataObj.append("questions[0][value]", inspectionData.value);
    formDataObj.append("questions[0][remark]", inspectionData.remark);

    try {
      await createInspection(formDataObj);
      window.location = "/products";
    } catch (error) {
      console.error(error);
      toast.error("Failed to create inspection");
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10">
        <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg lg:p-12">
          <h1 className="text-center text-3xl font-semibold text-gray-700">
            Edit Inspection
          </h1>
          <form
            noValidate
            onSubmit={submitInspection}
            className="flex flex-col gap-6 mt-8"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="asset_id"
                  className="mb-2 font-medium text-gray-600"
                >
                  Asset ID
                </label>
                <select
                  name="asset_id"
                  id="asset_id"
                  value={inspectionData.asset_id}
                  onChange={handleChange}
                  className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select an Asset</option>
                  {asset.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="question"
                  className="mb-2 font-medium text-gray-600"
                >
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  id="question"
                  value={inspectionData.question}
                  onChange={handleChange}
                  className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="value"
                  className="mb-2 font-medium text-gray-600"
                >
                  Value
                </label>
                <input
                  type="text"
                  name="value"
                  id="value"
                  value={inspectionData.value}
                  onChange={handleChange}
                  className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="remark"
                  className="mb-2 font-medium text-gray-600"
                >
                  Remark
                </label>
                <input
                  type="text"
                  name="remark"
                  id="remark"
                  value={inspectionData.remark}
                  onChange={handleChange}
                  className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="self-center px-6 py-3 mt-6 font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditInspection;
