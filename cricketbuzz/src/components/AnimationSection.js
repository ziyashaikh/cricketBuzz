
import React from 'react';
import dotGif from './images/dot.gif';
import oneGif from './images/one.gif';
import twoGif from './images/two.gif';
import threeGif from './images/three.gif';
import fourGif from './images/four.gif';
import fiveGif from './images/five.gif';
import sixGif from './images/six.gif';
import outGif from './images/out.gif';


const AnimationSection = ({ animation }) => {
  const getAnimationGif = (animation) => {
    const animations = {
      'runs-0': dotGif,
      'runs-1': oneGif,
      'runs-2': twoGif,
      'runs-3': threeGif,
      'runs-4': fourGif,
      'runs-5': fiveGif,
      'runs-6': sixGif,
      'wicket': outGif,
    };
    return animations[animation] || null;
  };

  return (
    <div className="animation-section">
      {animation && (
        <img src={getAnimationGif(animation)} alt={`Animation for ${animation}`} />
      )}
    </div>
  );
};

export default AnimationSection;