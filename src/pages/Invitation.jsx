import Hero from '../components/invitation/Hero';
import InvitationMessage from '../components/invitation/InvitationMessage';
import EventDetails from '../components/invitation/EventDetails';
import DressCode from '../components/invitation/DressCode';
import RSVP from '../components/invitation/RSVP';
import Parents from '../components/invitation/Parents';
import Gallery from '../components/invitation/Gallery';
import BackgroundMusic from '../components/invitation/BackgroundMusic';
import Gifts from '../components/invitation/Gifts';

function Invitation() {
    return (
        <main>
            <BackgroundMusic />
            <Hero />
            <InvitationMessage />
            <Parents />
            <Gallery />
            <EventDetails />
            <DressCode />
            <Gifts />
            <RSVP />
        </main>
    );
}

export default Invitation;