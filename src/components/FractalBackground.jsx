import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const FractalBackground = () => {
  const renderRef = useRef();

  useEffect(() => {
    let myp5;
    const sketch = (p) => {
      let t = 0;
      let dustNodes = [];

      // --- 3D Dust Sphere Node ---
      class DustNode {
        constructor(maxR) {
          this.maxR = maxR;
          this.r = p.random(maxR * 0.5, maxR * 0.9);
          this.theta = p.random(p.TWO_PI);
          this.phi = p.acos(p.random(-1, 1));
          this.size = p.random(1, 2.5);
          this.baseAlpha = p.random(60, 180);
        }

        show(rotY) {
          let theta = this.theta + rotY;
          let x = this.r * p.sin(this.phi) * p.cos(theta);
          let z = this.r * p.sin(this.phi) * p.sin(theta);
          let y = this.r * p.cos(this.phi);

          let scale = p.map(z, -this.maxR, this.maxR, 0.3, 2.0);
          let alpha = p.map(z, -this.maxR, this.maxR, 5, this.baseAlpha);

          p.noStroke();
          p.fill(0, 255, 65, alpha);
          p.push();
          p.translate(x, y);
          p.circle(0, 0, this.size * scale);
          p.pop();
        }
      }

      // --- Mandala Helpers ---
      const drawGearRing = (r, teeth, depth, alpha, sw) => {
        p.strokeWeight(sw);
        p.stroke(0, 255, 65, alpha);
        p.noFill();
        p.beginShape();
        for (let i = 0; i <= teeth * 2; i++) {
          let angle = (i * p.TWO_PI) / (teeth * 2);
          let rad = (i % 2 === 0) ? r : r + depth;
          p.vertex(rad * p.cos(angle), rad * p.sin(angle));
        }
        p.endShape(p.CLOSE);
      };

      const drawGeometricRing = (r, sides, rotation, alpha, sw) => {
        p.strokeWeight(sw);
        p.stroke(0, 255, 65, alpha);
        p.noFill();
        p.push();
        p.rotate(rotation);
        p.beginShape();
        for (let i = 0; i <= sides; i++) {
          let angle = (i * p.TWO_PI) / sides;
          p.vertex(r * p.cos(angle), r * p.sin(angle));
        }
        p.endShape(p.CLOSE);
        p.pop();
      };

      const drawDataSpokes = (r, count, rotation, alpha) => {
        p.strokeWeight(0.8);
        p.stroke(0, 255, 65, alpha);
        p.push();
        p.rotate(rotation);
        for (let i = 0; i < count; i++) {
          let angle = (i * p.TWO_PI) / count;
          let x1 = r * 0.4 * p.cos(angle);
          let y1 = r * 0.4 * p.sin(angle);
          let x2 = r * p.cos(angle);
          let y2 = r * p.sin(angle);
          p.line(x1, y1, x2, y2);
          p.fill(0, 255, 65, alpha);
          p.noStroke();
          p.circle(x2, y2, 3);
          p.noFill();
          p.stroke(0, 255, 65, alpha);
        }
        p.pop();
      };

      p.setup = () => {
        const w = window.innerWidth > 900 ? window.innerWidth / 2 : window.innerWidth;
        p.createCanvas(w, window.innerHeight);
        p.angleMode(p.RADIANS);
        p.strokeCap(p.ROUND);

        // Sphere radius = 40% of the smaller canvas dimension
        const maxR = p.min(w, window.innerHeight) * 0.40;

        // Build dust sphere with canvas-relative radius
        for (let i = 0; i < 800; i++) {
          dustNodes.push(new DustNode(maxR));
        }
      };

      p.draw = () => {
        p.background(5, 5, 10, 25);
        p.translate(p.width / 2, p.height / 2);

        // --- 3D DUST SPHERE ---
        let sphereRot = t * 0.003;
        for (let node of dustNodes) {
          node.show(sphereRot);
        }

        // --- AUTOMATION MANDALA ---
        p.push();
        p.rotate(t * 0.003);
        drawGearRing(280, 32, 10, 18, 1.2);
        p.pop();

        p.push();
        p.rotate(-t * 0.005);
        drawGearRing(230, 24, 8, 22, 1);
        p.pop();

        drawGeometricRing(180, 12, t * 0.008, 30, 1);
        drawGeometricRing(160, 8, -t * 0.01, 35, 1.2);
        drawGeometricRing(130, 6,  t * 0.012, 28, 1);

        drawDataSpokes(260, 32, -t * 0.002, 18);
        drawDataSpokes(190, 16,  t * 0.006, 25);

        drawGeometricRing(90, 3, -t * 0.02, 40, 1.5);
        drawGeometricRing(90, 3,  t * 0.02 + p.PI, 20, 0.8);
        drawGeometricRing(60, 6,  t * 0.015, 35, 1.2);
        drawGeometricRing(40, 4, -t * 0.025, 45, 1.5);

        // Pulsing center
        let pulse = p.map(p.sin(t * 0.05), -1, 1, 4, 12);
        p.noStroke();
        p.fill(0, 255, 65, 180);
        p.circle(0, 0, pulse);

        p.noFill();
        p.strokeWeight(0.5);
        p.stroke(0, 255, 65, 8);
        p.circle(0, 0, 360);
        p.circle(0, 0, 260);
        p.circle(0, 0, 180);

        // --- SPHERICAL CENTER DIMMING ---
        // Radial gradient that dims the center where identity overlay sits
        const cx = p.width / 2;
        const cy = p.height / 2;
        // Cap the dimming size so it doesn't swallow the fixed-size rings on desktop
        const innerR = p.min(p.width, p.height) * 0.15 > 120 ? 120 : p.min(p.width, p.height) * 0.15;
        const outerR = p.min(p.width, p.height) * 0.35 > 260 ? 260 : p.min(p.width, p.height) * 0.35;
        const grad = p.drawingContext.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
        grad.addColorStop(0, 'rgba(5, 5, 10, 0.88)');
        grad.addColorStop(1, 'rgba(5, 5, 10, 0)');
        p.drawingContext.save();
        p.drawingContext.setTransform(1, 0, 0, 1, 0, 0); // reset transform to canvas coords
        p.drawingContext.fillStyle = grad;
        p.drawingContext.fillRect(0, 0, p.width, p.height);
        p.drawingContext.restore();

        t++;
      };

      p.windowResized = () => {
        const w = window.innerWidth > 900 ? window.innerWidth / 2 : window.innerWidth;
        p.resizeCanvas(w, window.innerHeight);
      };
    };

    myp5 = new p5(sketch, renderRef.current);
    return () => myp5.remove();
  }, []);

  return <div ref={renderRef} className="fractal-container" />;
};

export default FractalBackground;
