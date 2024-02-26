import { Showpad } from '@showpad/experience-app-sdk';
import { AxiosInstance } from 'axios';
import sanitizeHtml from 'sanitize-html';
import { v4 as uuid } from 'uuid';

type TeamActivity = {
    description: string;
    teammate: string;
    teamId: string;
};

type Team = {
    name: string;
};

const TEAM_ACTIVITIES_STORE_ID = 'team-activities-store';
const TEAMS_STORE_ID = 'teams-store';
const MY_TEAM_ENTRY_ID = 'myTeamId';

let showpadInstance: AxiosInstance;
let myTeamId: string;
let myTeam: Team;

const addTeamActivity = async () => {
    try {
        const teamActivity: TeamActivity = {
            description: document.querySelector<HTMLInputElement>('#teamActivityDescription')?.value || '',
            teammate: document.querySelector<HTMLInputElement>('#teamActivityAnonymous')!.checked
                ? ''
                : (await Showpad.getUserInfo()).fullName,
            teamId: myTeamId?.toString(),
        };

        if (teamActivity.description && teamActivity.teamId) {
            await Showpad.setGlobalStoreEntryValue(TEAM_ACTIVITIES_STORE_ID, uuid(), teamActivity, showpadInstance);
        }

        renderTeamActivityList();
    } catch (error) {
        Showpad.handleErrorWithToast(error);
        console.error(error);
    }
};

const renderTeamActivityList = async () => {
    const teamActivities = (await Showpad.getGlobalStoreEntries<TeamActivity>(TEAM_ACTIVITIES_STORE_ID)).filter(
        (teamActivity) => teamActivity.value.teamId === myTeamId,
    );
    let teamActivityListHtml = '';
    teamActivities.forEach(
        (teamActivity) =>
            (teamActivityListHtml += `<tr><td>${teamActivity.value.description}</td><td>${teamActivity.value.teammate}</td></tr>`),
    );
    document.querySelector<HTMLDivElement>('#teamActivityList')!.innerHTML = sanitizeHtml(`
        <table>
            <tr><th>Description</th><th>Teammate</th></tr>
            ${teamActivityListHtml}
        </table>`);
};

const showGreetings = async (): Promise<void> => {
    const userInfo = await Showpad.getUserInfo();
    document.querySelector<HTMLDivElement>('#userGreetings')!.innerText = `Hello ${userInfo.fullName}!`;
};

const showLogoAndIntro = async (): Promise<void> => {
    const config = await Showpad.parseEnrichedConfig();
    document.querySelector<HTMLDivElement>('#introPart1')!.innerText = config.labels.intro.part1.value;
    document.querySelector<HTMLDivElement>('#introPart2')!.innerText = config.labels.intro.part2.value;
    if (config.assets && config.assets[config.contents.logo.value]) {
        document.querySelector<HTMLDivElement>('#logoWrapper')!.innerHTML = sanitizeHtml(
            `<img src="${config.assets[config.contents.logo.value].previewUrl}"/>`,
            { allowedTags: ['img'] },
        );
    }
};

const initMyTeam = async (): Promise<void> => {
    const myTeamDomElement = document.querySelector<HTMLDivElement>('#myTeam')!;
    myTeamId = await Showpad.getStoreEntryValue(TEAMS_STORE_ID, MY_TEAM_ENTRY_ID);
    if (myTeamId) {
        myTeam = await Showpad.getGlobalStoreEntryValue<Team>(TEAMS_STORE_ID, myTeamId);
        if (myTeam) {
            myTeamDomElement.innerHTML = sanitizeHtml(`Your team is <strong>${myTeam.name}</strong>`);
            document.querySelector<HTMLDivElement>('#teamActivityCrud')!.style.display = 'block';
        } else {
            myTeamDomElement.innerText = "Your team doesn't exist anymore";
        }
    } else {
        myTeamDomElement.innerText = 'Please select your team in the "My Team" user settings';
    }
};

const main = async (): Promise<void> => {
    try {
        // Wait for the Showpad SDK to be initialized
        await Showpad.onShowpadLibLoaded();
        showpadInstance = await Showpad.getShowpadInstance('v3');

        // Show greetings
        await showGreetings();

        // Show logo and intro
        await showLogoAndIntro();

        // Init
        await initMyTeam();

        if (myTeamId) {
            // Render team activity list
            renderTeamActivityList();

            // Bind event listeners
            document.querySelector<HTMLButtonElement>('#addTeamActivityButton')!.addEventListener('click', () => addTeamActivity());
        }
    } catch (error) {
        Showpad.handleErrorWithToast(error);
        console.error(error);
    }
};

main();
