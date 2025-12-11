document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const coverElement = document.querySelector('.frame-whole .cover');
  const partElement = document.querySelector('.frame-whole #part-1');

  if (!coverElement || !partElement) {
    console.error("❌ 错误: 找不到 .cover 或 .part 容器。");
    return;
  }

  // --- 定义 Pinning 阶段的持续时间 ---
  const pinDuration1 = 1;    // 阶段 1 比例: 1.0 (聚拢)
  const pinDuration2 = 1;  // 阶段 2 比例: 0.5 (飞出)
  const pinEndTotalVH = window.innerHeight * (pinDuration1 + pinDuration2); // 总持续滚动距离 (1.5vh)

  // ----------------------------------------------------------------------
  // 1. 设置 Pinning：持续总共 1.5vh
  // ----------------------------------------------------------------------
  const pinInstance = ScrollTrigger.create({
    trigger: coverElement,
    start: 'top top',
    end: `+=${pinEndTotalVH}`, // Pinning 持续总共 1.5vh
    pin: true,
    pinSpacing: false,
  });

  const pinSpacer = pinInstance.spacer;
  if (!pinSpacer) {
    console.error("❌ 错误: Pinning 占位符 (Spacer) 未创建。");
    return;
  }
  pinSpacer.style.height = `${pinEndTotalVH}px`;
  pinSpacer.style.minHeight = `${pinEndTotalVH}px`;


  // ----------------------------------------------------------------------
  // ⚠️ FRAME 2 & FRAME 3 目标状态数据 (您的完整数据)
  // ----------------------------------------------------------------------
  const frame2Targets = {
    // --- 图像元素 (.image-X) ---
    '.image-24': { top: 559, left: '0%', rotation: 0 }, '.image-23': { top: 684, left: '61.15%', rotation: 0 },
    '.image-2': { top: 237, left: '27.61%', rotation: 0 }, '.image-3': { top: 65, left: '78.86%', rotation: 0 },
    '.image-4': { top: 852, left: '83.37%', rotation: 0 }, '.image-25': { top: 320, left: '55.38%', rotation: 0 },
    '.image-5': { top: 679, left: '11.77%', rotation: 0 }, '.image-6': { top: 58, left: '36.77%', rotation: 0 },
    '.image-7': { top: 916, left: '19.69%', rotation: 0 }, '.image-8': { top: 15, left: '16.89%', rotation: 0 },
    '.image-9': { top: 848, left: '42.75%', rotation: 0 }, '.image-10': { top: 748, left: '31.22%', rotation: 0 },
    '.image-11': { top: 558, left: '22.88%', rotation: 0 }, '.image-12': { top: 355, left: '83.37%', rotation: 0 },
    '.image-13': { top: 114, left: '3.55%', rotation: 0 }, '.image-14': { top: 341, left: '45.32%', rotation: 0 },
    '.image-15': { top: 608, left: '46.84%', rotation: 0 }, '.image-16': { top: 70, left: '56.08%', rotation: 0 },
    '.image-17': { top: 203, left: '5.49%', rotation: 0 }, '.image-18': { top: 782, left: '33.86%', rotation: 0 },
    '.image-19': { top: 383, left: 0, rotation: 0 }, '.image-20': { top: 479, left: '72.19%', rotation: 0 },
    '.image-21': { top: 203, left: '72.61%', rotation: 0 }, '.image-22': { top: 723, left: '63.37%', rotation: 0 },

    // --- 特殊元素 ---
    '.passport': { top: 306, left: 271, rotation: 0 }, '.div': { top: 676, left: 170, rotation: -26.35 },
    '.hand': { top: 501, left: 1201, rotation: -10.93 }, '.passport-2': { top: 805, left: 252, rotation: 69.83 },
    '.passport-3': { top: 97, left: 776, rotation: -28.41 }, '.clock': { top: 512, left: 550 },
    '.bulb': { top: 25, left: 286 }, '.people': { top: 720, left: 970 },
    '.people-2': { top: 353, left: 909 }, '.step': { top: 472, left: 504 },
    '.ban': { top: 470, left: 344 }, '.ban-2': { top: 450, left: 134 },
    '.step-2': { top: 760, left: 484 }, '.step-3': { top: 694, left: 488 },
    '.bam': { top: 846, left: 1064 }, '.step-4': { top: 623, left: 476 },
    '.step-5': { top: 548, left: 488 }, '.step-6': { top: 315, left: 503 },
    '.step-7': { top: 214, left: 499 }, '.step-8': { top: 387, left: 494 },
    '.people-3': { top: 190, left: 398 }, '.clock-vec-wrapper': { top: 610, left: 59 },

    // --- 标题组 (飞出屏幕) ---
    '.title-group': { right: '-100%', top: 100 }, '.VISA-shutdown': { top: -264, left: 621 },
    '.subtitle': { top: -377, left: 662 }, '.text-wrapper-2': { top: -56, left: 653 },
  };

  // ⚠️ FRAME 3 目标状态数据 (飞出屏幕)
  const frame3Targets = {
    '.image-24': { top: 359, left: '-100%', rotation: -180, opacity: 0 }, '.image-23': { top: 884, left: '200%', rotation: 180, opacity: 0 },
    '.image-2': { top: 37, left: '-100%', rotation: -180, opacity: 0 }, '.image-3': { top: 265, left: '200%', rotation: 180, opacity: 0 },
    '.image-4': { top: 1052, left: '200%', rotation: 180, opacity: 0 }, '.image-25': { top: 520, left: '200%', rotation: 180, opacity: 0 },
    '.image-5': { top: 479, left: '-100%', rotation: -180, opacity: 0 }, '.image-6': { top: -142, left: '-100%', rotation: -180, opacity: 0 },
    '.image-7': { top: 716, left: '-100%', rotation: -180, opacity: 0 }, '.image-8': { top: -185, left: '-100%', rotation: -180, opacity: 0 },
    '.image-9': { top: 1048, left: '200%', rotation: 180, opacity: 0 }, '.image-10': { top: 548, left: '-100%', rotation: -180, opacity: 0 },
    '.image-11': { top: 358, left: '-100%', rotation: -180, opacity: 0 }, '.image-12': { top: 555, left: '200%', rotation: 180, opacity: 0 },
    '.image-13': { top: -86, left: '-100%', rotation: -180, opacity: 0 }, '.image-14': { top: 541, left: '200%', rotation: 180, opacity: 0 },
    '.image-15': { top: 808, left: '200%', rotation: 180, opacity: 0 }, '.image-16': { top: 270, left: '200%', rotation: 180, opacity: 0 },
    '.image-17': { top: 3, left: '-100%', rotation: -180, opacity: 0 }, '.image-18': { top: 982, left: '-100%', rotation: -180, opacity: 0 },
    '.image-19': { top: 183, left: '-100%', rotation: -180, opacity: 0 }, '.image-20': { top: 679, left: '200%', rotation: 180, opacity: 0 },
    '.image-21': { top: 403, left: '200%', rotation: 180, opacity: 0 }, '.image-22': { top: 923, left: '200%', rotation: 180, opacity: 0 },

    // 特殊元素 (Special Elements)
    '.passport': { top: 106, left: '-100%', rotation: -180, opacity: 0 }, '.div': { top: 476, left: '-100%', rotation: -206.35, opacity: 0 },
    '.hand': { top: 701, left: '200%', rotation: 169.07, opacity: 0 }, '.passport-2': { top: 1005, left: '-100%', rotation: 249.83, opacity: 0 },
    '.passport-3': { top: 297, left: '200%', rotation: 151.59, opacity: 0 }, '.clock': { top: 712, left: '200%', opacity: 0 },
    '.bulb': { top: -175, left: '-100%', opacity: 0 }, '.people': { top: 920, left: '200%', opacity: 0 },
    '.people-2': { top: 553, left: '200%', opacity: 0 }, '.step': { top: 672, left: '200%', opacity: 0 },
    '.ban': { top: 670, left: '-100%', opacity: 0 }, '.ban-2': { top: 650, left: '-100%', opacity: 0 },
    '.step-2': { top: 960, left: '200%', opacity: 0 }, '.step-3': { top: 894, left: '200%', opacity: 0 },
    '.bam': { top: 1046, left: '200%', opacity: 0 }, '.step-4': { top: 823, left: '200%', opacity: 0 },
    '.step-5': { top: 748, left: '200%', opacity: 0 }, '.step-6': { top: 515, left: '200%', opacity: 0 },
    '.step-7': { top: 414, left: '200%', opacity: 0 }, '.step-8': { top: 587, left: '200%', opacity: 0 },
    '.people-3': { top: -10, left: '-100%', opacity: 0 }, '.clock-vec-wrapper': { top: 410, left: '-100%', opacity: 0 },

    // 标题组 (Title Group)
    '.title-group': { right: '-100%', top: -200, opacity: 0 }, '.VISA-shutdown': { top: -500, left: '200%', opacity: 0 },
    '.subtitle': { top: -600, left: '200%', opacity: 0 }, '.text-wrapper-2': { top: -700, left: '200%', opacity: 0 },
  };
  // ----------------------------------------------------------------------


  // 2. 创建总时间线 (Master Timeline)
  const masterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: pinSpacer,
      start: 'top top',
      end: `+=${pinEndTotalVH}`,
      scrub: true,
    }
  });

  // 3. 动画循环 1：Frame 1 -> Frame 2 (聚拢)
  // 动画持续时间设置为 pinDuration1 (比例 1.0)
  for (const selector in frame2Targets) {
    const elements = document.querySelectorAll(selector);
    const targetProps = frame2Targets[selector];
    if (elements.length === 0) continue;

    const gsapProps = {};
    for (const prop in targetProps) {
      if (prop === 'rotation') { gsapProps['rotationZ'] = targetProps[prop]; }
      else { gsapProps[prop] = targetProps[prop]; }
    }

    // 使用 position: 0 确保在 Timeline 开始时 (0%) 立即开始
    masterTimeline.to(elements, { ...gsapProps, ease: 'none', duration: pinDuration1 }, 0);
  }

  // 4. 动画循环 2：Frame 2 -> Frame 3 (飞出)
  // 动画在 Frame 1 -> 2 结束后立即开始，持续 pinDuration2 (比例 0.5)
  for (const selector in frame3Targets) {
    const elements = document.querySelectorAll(selector);
    const targetProps = frame3Targets[selector];
    if (elements.length === 0) continue;

    const gsapProps = {};
    for (const prop in targetProps) {
      if (prop === 'rotation') { gsapProps['rotationZ'] = targetProps[prop]; }
      else { gsapProps[prop] = targetProps[prop]; }
    }

    // 关键修正: 使用 position: pinDuration1 来确保动画在前一个阶段结束后立即开始 (在总进度的 66.6% 处)
    masterTimeline.to(elements, { ...gsapProps, ease: 'none', duration: pinDuration2 }, pinDuration1);
  }
  masterTimeline.to(coverElement, {
    opacity: 0,
    ease: 'none',
    duration: pinDuration2 // 动画持续时间与内部元素飞出时间相同
  }, pinDuration1); // 动画开始于 Frame 1 -> Frame 2 结束后 (即 pinDuration1 处)



  // 6. 强制刷新布局
  ScrollTrigger.refresh(true);
});