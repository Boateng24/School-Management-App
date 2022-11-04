import React from "react";

export const ChatWidget = (imageUrl, username, workspace, message) => {
  return (
    <div className="mb-8">
      <div class="flex text-[#667085]">
        <div class="flex justify-between">
          <div>
            <img
              width={"40px"}
              height={"40px"}
              src="https://pickaface.net/gallery/avatar/20160625_050020_889_FAKE.png"
              alt="sender"
              className="rounded-3xl mx-4 mb-4"
            />
          </div>
          <div className="flex-inline w-[100%]">
            <div className="flex justify-between">
              <div className="mr-2">Godson Greene</div>
              {/* <p className="text-sm">Doctor Workspace</p> */}
            </div>
            <div className="p-4 bg-gray-50 w-[100%] rounded-tl-md rounded-bl-md rounded-br-md">
              <p className="text-[#667085]">
                Hey Olivia, can you please review the design when you can?
                Today, 9:25am
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
