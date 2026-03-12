let particles = [];
const particleCount = 8000;
let n = 4, m = 2;
let targetN = 4, targetM = 2;
let vibrationIntensity = 18;
let friction = 0.85; // 略微调高摩擦力，让运动更优雅

const palettes = [
  { name: "撒哈拉金", color: [242, 193, 102], bg: [20, 15, 10] },
  { name: "冰岛黑沙", color: [160, 165, 175], bg: [10, 12, 15] },
  { name: "纳米比亚红", color: [193, 73, 58], bg: [20, 10, 10] },
  { name: "大理石白", color: [240, 240, 245], bg: [15, 15, 20] },
  { name: "橄榄石绿", color: [155, 184, 114], bg: [10, 18, 12] }
];
let currentPaletteIdx = 0;
let displayColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  displayColor = color(palettes[0].color);
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Grain());
  }
}

function draw() {
  let bg = palettes[currentPaletteIdx].bg;
  // 增加了一点点透明度积累，让拖尾更丝滑
  background(bg[0], bg[1], bg[2], 25); 

  n = lerp(n, targetN, 0.03);
  m = lerp(m, targetM, 0.03);
  
  let targetC = color(palettes[currentPaletteIdx].color);
  displayColor = lerpColor(displayColor, targetC, 0.05);

  for (let p of particles) {
    p.vibrate();
    p.update();
    p.display();
  }
}

function getAmplitude(x, y) {
  // 映射到 [-1, 1] 空间
  let nx = (x - width / 2) / (min(width, height) / 2);
  let ny = (y - height / 2) / (min(width, height) / 2);
  
  // 标准克拉尼公式
  let a = cos(n * PI * nx) * cos(m * PI * ny);
  let b = cos(m * PI * nx) * cos(n * PI * ny);
  return a - b;
}

class Grain {
  constructor() {
    this.init();
  }

  init() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.size = random(1.5, 3.5);
    this.noiseOffset = random(1000);
    this.stagnantTime = 0; // 用于记录静止时长
  }

  vibrate() {
    let amp = getAmplitude(this.pos.x, this.pos.y);
    let intensity = abs(amp);

    // 1. 核心改进：即使在静止带，也保留极小的布朗运动 (0.1 振幅)
    let brownian = p5.Vector.random2D().mult(0.15);
    this.vel.add(brownian);

    if (intensity > 0.01) {
      let kick = p5.Vector.random2D();
      // 2. 优化力学模型：让粒子更有“逃离”高能区的倾向
      kick.mult(pow(intensity, 1.5) * vibrationIntensity);
      this.vel.add(kick);
    } else {
      // 3. 停滞检测：如果粒子处于绝对静止区太久，给它一个微小的推力
      this.stagnantTime++;
    }
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(friction);
    
    // 4. 边界处理与死区重生
    // 如果粒子飞出边界，或者在同一个地方呆了太久（模拟沙粒堆积过厚被震散）
    if (this.pos.x < 0 || this.pos.x > width || 
        this.pos.y < 0 || this.pos.y > height || 
        this.stagnantTime > 300) { 
      this.init();
    }
  }

  display() {
    noStroke();
    let brightnessVar = map(noise(this.noiseOffset, frameCount * 0.02), 0, 1, 0.7, 1.3);
    
    // 5. 视觉优化：粒子越靠近节点线（振幅小），透明度越高，模拟沙粒堆积感
    let amp = abs(getAmplitude(this.pos.x, this.pos.y));
    let alpha = map(amp, 0, 0.2, 255, 100, true);
    
    fill(red(displayColor) * brightnessVar, 
         green(displayColor) * brightnessVar, 
         blue(displayColor) * brightnessVar, 
         alpha);
    
    circle(this.pos.x, this.pos.y, this.size);
  }
}

function mousePressed() {
  // 切换频率
  targetN = floor(random(2, 10));
  targetM = floor(random(2, 10));
  while(abs(targetN - targetM) < 1) targetN = floor(random(2, 10));

  // 切换色系
  currentPaletteIdx = (currentPaletteIdx + 1) % palettes.length;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
