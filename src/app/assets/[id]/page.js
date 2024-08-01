"use client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateAssets, getAssets } from "../../services/assetsService";

function EditAssets() {
  const { id } = useParams(); // Extract the asset ID from the URL
  const [assetsData, setAssetsData] = useState({
    name: "",
    type: "",
    description: "",
    value: "",
    location: "",
    owner_id: "",
    assigned_to_id: null,
    features: {
      engine_capacity: "",
      mileage: "",
      fuel_tank_capacity: "",
      variant: "",
      kerb_weight: "",
    },
    dates: {
      "Last Maintenance Date": "",
      "Next Maintenance Date": "",
    },
    photos: [],
  });

  useEffect(() => {
    // Fetch the asset details to prefill the form (optional)
    async function fetchAsset() {
      try {
        const { data } = await getAssets(id); // Adjust this to fetch a specific asset if necessary
        console.log("product data", data);
        if (data && data.length > 0) {
          const asset = data.find((asset) => asset._id === id);
          if (asset) {
            setAssetsData({
              ...asset,
              features: {
                engine_capacity: asset.features.engine_capacity || "",
                mileage: asset.features.mileage || "",
                fuel_tank_capacity: asset.features.fuel_tank_capacity || "",
                variant: asset.features.variant || "",
                kerb_weight: asset.features.kerb_weight || "",
              },
              dates: {
                "Last Maintenance Date":
                  asset.dates["Last Maintenance Date"] || "",
                "Next Maintenance Date":
                  asset.dates["Next Maintenance Date"] || "",
              },
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch asset details:", error);
        toast.error("Failed to fetch asset details.");
      }
    }

    fetchAsset();
  }, [id]);

  function handleUserInput(e) {
    const { name, value } = e.target;
    setAssetsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleFeatureInput(e) {
    const { name, value } = e.target;
    setAssetsData((prevData) => ({
      ...prevData,
      features: {
        ...prevData.features,
        [name]: value,
      },
    }));
  }

  function handleDateInput(e) {
    const { name, value } = e.target;
    setAssetsData((prevData) => ({
      ...prevData,
      dates: {
        ...prevData.dates,
        [name]: value,
      },
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const {
      name,
      type,
      description,
      value,
      location,
      owner_id,
      assigned_to_id,
      features,
      dates,
    } = assetsData;

    // Validate that all required fields are filled and valid
    if (
      !name ||
      !type ||
      !description ||
      !value ||
      !location ||
      !owner_id ||
      !dates["Last Maintenance Date"] ||
      !dates["Next Maintenance Date"] ||
      !features.engine_capacity ||
      !features.mileage ||
      !features.fuel_tank_capacity ||
      !features.variant ||
      !features.kerb_weight
    ) {
      toast.error("Please fill all the details.");
      return;
    }

    const payload = {
      name,
      type,
      description,
      value,
      location,
      owner_id,
      assigned_to_id,
      dates,
      features,
      photos: assetsData.photos, // Excluding photos from update payload
    };

    // Log the payload for debugging
    console.log("Submitting asset data:", payload);

    try {
      await updateAssets(payload, id);
      toast.success("Asset updated successfully!");
      window.location = "/products";
    } catch (error) {
      console.error("Error updating asset:", error);
      toast.error("Failed to update asset.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex-1 w-full lg:w-2/3 flex flex-col gap-4 p-4 rounded-lg bg-white shadow-lg"
      >
        <h1 className="text-center text-2xl font-bold">Update Asset Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">Name</label>
            <input
              type="text"
              required
              name="name"
              id="name"
              placeholder="Enter asset name..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleUserInput}
              value={assetsData.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="font-semibold">Type</label>
            <input
              type="text"
              required
              name="type"
              id="type"
              placeholder="Enter asset type..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleUserInput}
              value={assetsData.type}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold">Description</label>
            <input
              type="text"
              required
              name="description"
              id="description"
              placeholder="Enter asset description..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleUserInput}
              value={assetsData.description}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="value" className="font-semibold">Value</label>
            <input
              type="text"
              required
              name="value"
              id="value"
              placeholder="Enter asset value..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleUserInput}
              value={assetsData.value}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="font-semibold">Location</label>
            <input
              type="text"
              required
              name="location"
              id="location"
              placeholder="Enter asset location..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleUserInput}
              value={assetsData.location}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="owner_id" className="font-semibold">Owner ID</label>
            <input
              type="text"
              required
              name="owner_id"
              id="owner_id"
              placeholder="Enter owner ID..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleUserInput}
              value={assetsData.owner_id}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="assigned_to_id" className="font-semibold">Assigned To ID</label>
            <input
              type="text"
              name="assigned_to_id"
              id="assigned_to_id"
              placeholder="Enter assigned to ID..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleUserInput}
              value={assetsData.assigned_to_id || ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="Last Maintenance Date" className="font-semibold">Last Maintenance Date</label>
            <input
              type="date"
              name="Last Maintenance Date"
              id="Last Maintenance Date"
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleDateInput}
              value={assetsData.dates["Last Maintenance Date"]}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="Next Maintenance Date" className="font-semibold">Next Maintenance Date</label>
            <input
              type="date"
              name="Next Maintenance Date"
              id="Next Maintenance Date"
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleDateInput}
              value={assetsData.dates["Next Maintenance Date"]}
            />
          </div> */}

          <div className="flex flex-col gap-2">
            <label htmlFor="engine_capacity" className="font-semibold">
              Engine Capacity
            </label>
            <input
              type="text"
              required
              name="engine_capacity"
              id="engine_capacity"
              placeholder="Enter engine capacity..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleFeatureInput}
              value={assetsData.features.engine_capacity}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="mileage" className="font-semibold">
              Mileage
            </label>
            <input
              type="text"
              required
              name="mileage"
              id="mileage"
              placeholder="Enter mileage..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleFeatureInput}
              value={assetsData.features.mileage}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fuel_tank_capacity" className="font-semibold">
              Fuel Tank Capacity
            </label>
            <input
              type="text"
              required
              name="fuel_tank_capacity"
              id="fuel_tank_capacity"
              placeholder="Enter fuel tank capacity..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleFeatureInput}
              value={assetsData.features.fuel_tank_capacity}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="variant" className="font-semibold">
              Variant
            </label>
            <input
              type="text"
              required
              name="variant"
              id="variant"
              placeholder="Enter variant..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleFeatureInput}
              value={assetsData.features.variant}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="kerb_weight" className="font-semibold">
              Kerb Weight
            </label>
            <input
              type="text"
              required
              name="kerb_weight"
              id="kerb_weight"
              placeholder="Enter kerb weight..."
              className="bg-transparent px-3 py-2 border rounded-md"
              onChange={handleFeatureInput}
              value={assetsData.features.kerb_weight}
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Update Asset
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAssets;
