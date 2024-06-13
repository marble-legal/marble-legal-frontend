import Button from "../../Button";
import CustomInput from "../../Input";
import { useEffect, useState } from "react";
import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import { api } from "../../../helpers/api";
import { useAuth } from "../../../AuthContext";
import axios from "axios";
import UserProfileIcon from "../../../assets/icons/profile.svg";
import { ShowToast } from "../../toast";

export default function Personal({
  onClose,
  setActiveTab,
}: {
  onClose: () => void;
  setActiveTab: (tab: string) => void;
}) {
  const { user, refetch } = useAuth();
  const [name, setName] = useState(user?.fullName);
  const [isLoading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(user.profileImg || "");
  const [isImageUploading, setImageUploading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUploading(true);
    api
      .getSignedUrl({
        id: user.id,
        data: {
          mimeType: e?.target?.files?.[0]?.type,
          uploadType: "USER_PROFILE",
          fileName: e?.target?.files?.[0]?.name,
        },
      })
      .then((res: any) => {
        axios
          .put(res.data.uploadUrl, e?.target?.files?.[0], {
            headers: {
              "Content-Type": e?.target?.files?.[0].type,
            },
          })
          .then(() => {
            api
              .editUser(user.id, {
                profileImg: res.data.accessUrl,
              })
              .then(() => {
                setImageUploading(false);
                setImgUrl(res.data.accessUrl);
                refetch();
              })
              .catch((error) => {
                ShowToast({
                  type: "error",
                  message:
                    error.response?.data?.message || "Failed to upload image",
                });
                setImageUploading(false);
              });
          })
          .catch((err) => {
            ShowToast({
              type: "error",
              message: err.response?.data?.message || "Failed to upload image",
            });
            setImageUploading(false);
          });
      })
      .catch((err) => {
        console.log(err);

        ShowToast({
          type: "error",
          message: err.response?.data?.message || "Failed to upload image",
        });
        setImageUploading(false);
      });
  };

  const handleUpdateUser = () => {
    setLoading(true);
    api
      .editUser(user.id, { fullName: name })
      .then((res) => {
        ShowToast({
          type: "success",
          message: "Profile updated successfully",
        });

        refetch();
        onClose();
        setLoading(false);
      })
      .catch((err) => {
        ShowToast({
          type: "error",
          message: err.response?.data?.message || "Failed to update profile",
        });
        setLoading(false);
      });
  };

  return (
    <div className="md:p-[1.5rem] p-[1.25rem] w-full flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <div className="relative">
          <label
            htmlFor="profile"
            className="cursor-pointer relative inline-block"
          >
            <input
              type="file"
              id="profile"
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
            />
            {isImageUploading && (
              <div className="w-[4.5rem] h-[4.5rem] rounded-full">
                <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center border-[#ddd] rounded-full border-[1px]">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#4AA064]"></div>
                </div>
              </div>
            )}
            {!isImageUploading && (
              <img
                className="w-[4.5rem] h-[4.5rem] rounded-full"
                src={imgUrl || UserProfileIcon}
                alt="profile"
              />
            )}
            <div className="absolute -bottom-0 -right-1 bg-[#4AA064] rounded-full p-1 border-[1.5px] border-white">
              <EditIcon className="w-4 h-4 [&_path]:stroke-white" />
            </div>
          </label>
        </div>
        <Button
          disabled={
            name === user?.fullName || name.length < 3 || name.length > 50
          }
          className="h-fit w-[100px] leading-[18px]"
          onClick={handleUpdateUser}
          loading={isLoading}
        >
          Save
        </Button>
      </div>

      <div className="grid gap-4">
        <CustomInput
          label="Your full name"
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
        <CustomInput
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={user?.email}
          onChange={() => {}}
          onChangeButton={() => setActiveTab("changeEmail")}
          className="w-full"
          disabled
          change
        />
      </div>
      <div className="flex flex-row gap-5 mt-5 md:mx-0 mx-auto">
        <button
          className="!text-[0.75rem] !font-[500] leading-[110%] underline transition-all hover:underline text-[#888]"
          onClick={() => setActiveTab("deleteAccount")}
        >
          Delete Account
        </button>
        <button
          className="!text-[0.75rem] !font-[500] leading-[110%] underline transition-all hover:underline text-[#888]"
          onClick={() => setActiveTab("changePassword")}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
