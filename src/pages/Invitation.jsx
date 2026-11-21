import Hero from '../components/invitation/Hero';
import InvitationMessage from '../components/invitation/InvitationMessage';
import EventDetails from '../components/invitation/EventDetails';
import DressCode from '../components/invitation/DressCode';
import RSVP from '../components/invitation/RSVP';
import Parents from '../components/invitation/Parents';

function Invitation() {
    return (
        <main>
            <Hero />
            <InvitationMessage />
            <Parents />
            <EventDetails />
            <DressCode />
            <RSVP />
        </main>
    );
}

export default Invitation;