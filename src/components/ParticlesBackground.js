import Particles from 'react-tsparticles';
import particlesConfig from '../components/particlesConfig/particlesConfig';

const ParticlesBackground = () => {
    return(
        <Particles
          params={particlesConfig}
        >
        </Particles> 
        )
}

export default ParticlesBackground;