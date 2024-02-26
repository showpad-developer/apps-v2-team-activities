import { Showpad } from '@showpad/experience-app-sdk';
import { AxiosInstance } from 'axios';
import sanitizeHtml from 'sanitize-html';
import { v4 as uuid } from 'uuid';

type Team = {
    name: string;
};

const TEAMS_STORE_ID = 'teams-store';

let showpadInstance: AxiosInstance;

const addTeam = async () => {
    try {
        const nameField = document.querySelector<HTMLInputElement>('#name')!;
        const team: Team = {
            name: nameField.value || '',
        };

        if (team.name) {
            await Showpad.setGlobalStoreEntryValue(TEAMS_STORE_ID, uuid(), team, showpadInstance);
            nameField.value = '';

            renderTeamList();

            Showpad.displayToast({
                type: 'success',
                text: 'Team created',
            });
        }
    } catch (error) {
        Showpad.handleErrorWithToast(error);
        console.error(error);
    }
};

const renderTeamList = async () => {
    try {
        const teams = await Showpad.getGlobalStoreEntries<Team>(TEAMS_STORE_ID);
        let teamListHtml = '';
        teams.forEach((team) => (teamListHtml += `<tr><td>${team.value.name}</td></tr>`));
        document.querySelector<HTMLDivElement>('#teamList')!.innerHTML = sanitizeHtml(`<table><th>Team Name</th>${teamListHtml}</table>`);
    } catch (error) {
        Showpad.handleErrorWithToast(error);
        console.error(error);
    }
};

const main = async (): Promise<void> => {
    try {
        await Showpad.onShowpadLibLoaded();
        showpadInstance = await Showpad.getShowpadInstance('v3');

        // Render team list
        renderTeamList();

        // Bind CTAs
        const btn = document.querySelector<HTMLButtonElement>('#addTeamButton');
        btn?.addEventListener('click', () => addTeam());
    } catch (error) {
        Showpad.handleErrorWithToast(error);
        console.error(error);
    }
};

main();
