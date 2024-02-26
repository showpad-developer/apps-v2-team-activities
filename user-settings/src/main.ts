import { Showpad } from '@showpad/experience-app-sdk';
import sanitizeHtml from 'sanitize-html';

type Team = Showpad.Scalar & {
    name: string;
    location: string;
    department: string;
};

const TEAMS_STORE_ID = 'teams-store';
const MY_TEAM_ENTRY_ID = 'myTeamId';

const myTeamDropdownElement = document.querySelector<HTMLSelectElement>('#myTeam')!;

const populateTeamDropdown = async (): Promise<void> => {
    let optionsHtml = '<option>Select your team</option>';
    const myTeamId = await Showpad.getStoreEntryValue<Team>(TEAMS_STORE_ID, MY_TEAM_ENTRY_ID);
    const teams = await Showpad.getGlobalStoreEntries<Team>(TEAMS_STORE_ID);
    teams.forEach(
        (team) => (optionsHtml += `<option value="${team.id}" ${myTeamId === team.id ? 'selected' : ''}>${team.value.name}</option>`),
    );
    myTeamDropdownElement.innerHTML = sanitizeHtml(optionsHtml, {
        allowedTags: ['option'],
        allowedAttributes: {
            option: ['value', 'selected'],
        },
    });
};

const setMyTeam = async (): Promise<void> => {
    try {
        await Showpad.setStoreEntryValue(TEAMS_STORE_ID, MY_TEAM_ENTRY_ID, myTeamDropdownElement.value);
        Showpad.displayToast({
            type: 'success',
            text: 'Your team has been set',
        });
    } catch (error) {
        Showpad.handleErrorWithToast(error);
        console.error(error);
    }
};

const main = async (): Promise<void> => {
    try {
        await Showpad.onShowpadLibLoaded();

        // Populate the team dropdown
        populateTeamDropdown();

        // Bind CTAs
        myTeamDropdownElement.addEventListener('change', () => setMyTeam());
    } catch (error) {
        Showpad.handleErrorWithToast(error);
        console.error(error);
    }
};

main();
