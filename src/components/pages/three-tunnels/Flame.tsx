import { useNavigate } from "react-router-dom";
import archwayImage from "../../../assets/dungeon/tunnels/flame-symbol.png";
import flameCavernImg from "../../../assets/dungeon/tunnels/flame-cavern.png";
import explosionImg from "../../../assets/dungeon/tunnels/flame-cavern-explosion.png";
import deadImage from "../../../assets/dungeon/tunnels/flame-deeper-dead.png";
import survivedImage from "../../../assets/dungeon/tunnels/flame-deeper-survive.png";
import Conversation from "../../Conversation";
import StandardPage from "../../StandardPage";
import { useCharacter } from "data/character-data";
import BackgroundChange from "components/BackgroundChange";

export const Flame = () => {
	const navigate = useNavigate()
	const { inventoryContains, identifyItem } = useCharacter()

	const youSurvived = inventoryContains("FireOrb");
	
	return (
		<StandardPage backgroundImage={archwayImage} title="The Flame">
			<Conversation width={20}>
				<p>You choose the tunnel marked with a Flame.</p>
				<p>
					<BackgroundChange src={flameCavernImg}/>
					As you proceed, the sound of a crackling fire grows louder, and
					soon you find yourself in a vast underground cavern filled
					with dancing flames. The walls glow with heat.
				</p>
				<p>
					<BackgroundChange src={explosionImg}/>
					A sudden eruption of flame engulfs you.
					You try to escape but the fire is too intense, trapping you
					inside the cavern.
				</p>
				{youSurvived ? (<>
					<p>
						<BackgroundChange src={survivedImage}/>
						Your orb glows brightly, and a protective barrier forms around you,
						shielding you from the flames. You safely make your way out of the cavern.
					</p>
					<p>
						You reach a corridor at the end of the cavern, you enter the small arched hallway.
					</p>

					<span className="conversation-controls">
						<button 
							onClick={() => identifyItem("FireOrb") && navigate("/tunnels/flame-deeper")}>Continue
						</button>
					</span>

				</>) : (<>

					<p>
						<BackgroundChange src={deadImage}/>
						You have perished in the flames.
						<span className="conversation-controls">
							<button 
								onClick={() => navigate("/")}>Restart
							</button>
						</span>
					</p>
				</>)}
			</Conversation>
		</StandardPage>
	)
}
