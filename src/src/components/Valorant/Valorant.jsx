import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Valorant.css';
import '../../assets/icons/valorant_icon.png'

export default function AgentList(props) {
  const agents = props.agentsData

  const sliderSettings = {
    infinite: true,
    fade: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    adaptiveHeight: true
  };

  return (
    <div className='content'>
      <Slider {...sliderSettings} className='agent-slider'>
        {agents.map((agent) => (
          <div key={agent.uuid}>
            <div className='agent-card' style={{ background: `linear-gradient(160deg,#${agent.backgroundGradientColors[0]}, #${agent.backgroundGradientColors[1]})`}}>
              <section className='agent-icon' style={{ backgroundImage: `url(${agent.background})` }}>
                <img src={agent.fullPortraitV2} alt={agent.displayName} width="100%"/>
              </section>
              <section className='agent-info'>
                <h1>{agent.displayName}<span>{agent.role.displayName}</span></h1>
                <p>{agent.description}</p>
                <ul className='agent-abilities'>
                {agent.abilities.map((ability) => (
                    <li className='abilities-info' key={ability.displayName}>
                      {ability.displayIcon ? (
                        <img src={ability.displayIcon} alt={ability.displayName} width="50px" height="50px"/>
                      ) : null}
                      <section>
                        <h3>{ability.displayName}</h3>
                        <p>{ability.description}</p>
                      </section>
                    </li>
                  ))
                }
                </ul>
              </section>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

AgentList.propTypes = {
  agentsData: PropTypes.array.isRequired
};
