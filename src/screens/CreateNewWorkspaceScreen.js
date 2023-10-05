import { useState } from "react";
import styled from "styled-components";
import TwoColLayout from "../components/TwoColLayout";
import LinkLogo from "../components/LinkLogo";
import Button from "../components/Button";
import Input from "../components/Input";
import { useWorkspace } from "../hooks/useWorkspace";
import { useRoom } from "../hooks/useRoom";
import { useNavigate } from "react-router-dom";

function CreateNewWorkspaceScreen() {
    const navigate = useNavigate();

  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceInvitedMembers, setWorkspaceInvitedMembers] = useState('');
  const [workspaceFirstRoom, setWorkspaceFirstRoom] = useState('');
  const [step, setStep] = useState(1);

  const { addWorkspace, addInvitedEmailToWorkspace } = useWorkspace();
  const { createRoomForWorkspace } = useRoom();

  const createWorkspace = async () => {
    // Create workspace
    const addedWorkspace = await addWorkspace(workspaceName);

    // Add invited_users to workspace if there's
    if (addedWorkspace && workspaceInvitedMembers) {
        console.log(addedWorkspace);
        workspaceInvitedMembers.split(',').forEach((memberMail) => {
            addInvitedEmailToWorkspace(addedWorkspace.id, memberMail)
        })
    }

    // Create room for created workspace if there's
    let createdRoom;
    if (addedWorkspace && workspaceFirstRoom) {
        createdRoom = await createRoomForWorkspace(addedWorkspace.id, workspaceFirstRoom)
    }

    // Redirect to page of created workspace or room in workspace
    if (createdRoom) {
        navigate(`/${addedWorkspace.id}/${createdRoom.id}`)
    } else {
        navigate(`/${addedWorkspace.id}`)
    }
  }

  return (
    <TwoColLayout>
      <LinkLogo />
      {step === 1 && (
        <>
          <Step
            heading={"What’s the name of your pack?"}
            subheading={`This will be the name of your Chatmeow workspace — choose something that your pack will recognize. Enter the name of your company or team to create a Chatmeow workspace.`}
          />
          <Input
            placeholder={"Ex. Catpurrrsss or Meowsssss"}
            onChange={(e) => {
              setWorkspaceName(e.target.value);
            }}
          />
          <Button
            style={{
              marginTop: 48,
            }}
            onClick={() => {
              workspaceName && setStep(2);
            }}
          >
            Next
          </Button>
        </>
      )}
         {step === 2 && (
        <>
          <Step
            heading={`Who else is in the ${workspaceName} pack`}
          />
          <Input
            placeholder={"Ex. schone@gmail.com, julka@gmail.com"}
            textarea
            onChange={(e) => {
                setWorkspaceInvitedMembers(e.target.value);
            }}
          />
           <Button
            style={{
              marginTop: 48,
              marginRight: 20
            }}
            onClick={() => {
              setWorkspaceName('')
              setWorkspaceInvitedMembers('');
              setStep(1);
            }}
          >
            Previous
          </Button>
          <Button
            style={{
              marginTop: 48,
            }}
            onClick={() => {
              workspaceInvitedMembers && setStep(3);
            }}
          >
            Next
          </Button>
          <Button
            style={{
              marginTop: 48,
              display: 'inline-flex',
              display: 'block'
            //   marginLeft: '17.5%'
            }}
            onClick={() => {
              setWorkspaceInvitedMembers('');
              setStep(3);
            }}
          >
            Skip
          </Button>
        </>
      )}
         {step === 3 && (
        <>
          <Step
            heading={`What’s your pack working on right now?`}
            subheading='This could be anything: a project, campaign, event, or the deal you’re trying to close.'
          />
          <Input
            placeholder={"Ex. War against humans, steal dogs food"}
            onChange={(e) => {
                setWorkspaceFirstRoom(e.target.value);
            }}
          />
           <Button
            style={{
              marginTop: 48,
              marginRight: 20
            }}
            onClick={() => {
              setWorkspaceInvitedMembers('');
              setStep(2);
            }}
          >
            Previous
          </Button>
          <Button
            style={{
              marginTop: 48,
            }}
            onClick={() => {
              workspaceFirstRoom && createWorkspace();
            }}
          >
            Next
          </Button>
          <Button
            style={{
              marginTop: 48,
              display: 'block'
            //   marginLeft: '16.5%'
            }}
            onClick={() => {
              createWorkspace();
            }}
          >
            Skip
          </Button>
        </>
      )}
    </TwoColLayout>
  );
}

const Step = ({ heading, subheading }) => {
  return (
    <>
      <StepHeading>{heading}</StepHeading>
      <StepSubheading>{subheading}</StepSubheading>
    </>
  );
};

const StepHeading = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: #333;
  margin-top: 100px;
`;

const StepSubheading = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin: 20px 0;
`;

export default CreateNewWorkspaceScreen;
