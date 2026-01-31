import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logo-container" [class.small]="size === 'small'" [class.large]="size === 'large'">
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
        <!-- Modern Rocket/Arrow Design for ClickUp -->
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#7c3aed;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Rocket Shape -->
        <path d="M60 15 L80 50 L70 55 L70 85 L60 95 L50 85 L50 55 L40 50 Z" 
              fill="url(#logoGradient)" 
              stroke="none"/>
        
        <!-- Window/Detail -->
        <circle cx="60" cy="40" r="8" fill="white" opacity="0.9"/>
        <circle cx="60" cy="40" r="4" fill="url(#logoGradient)"/>
        
        <!-- Flame/Exhaust Left -->
        <path d="M50 85 Q45 95 50 105" 
              stroke="#fbbf24" 
              stroke-width="4" 
              stroke-linecap="round" 
              fill="none" 
              opacity="0.8"/>
        
        <!-- Flame/Exhaust Center -->
        <path d="M60 95 Q60 105 60 110" 
              stroke="#f97316" 
              stroke-width="5" 
              stroke-linecap="round" 
              fill="none" 
              opacity="0.9"/>
        
        <!-- Flame/Exhaust Right -->
        <path d="M70 85 Q75 95 70 105" 
              stroke="#fbbf24" 
              stroke-width="4" 
              stroke-linecap="round" 
              fill="none" 
              opacity="0.8"/>
      </svg>
      <div class="logo-text" *ngIf="showText">
        <span class="logo-title">ClickUp</span>
        <span class="logo-subtitle" *ngIf="size === 'large'">One App To Replace Them All</span>
      </div>
    </div>
  `,
  styles: [`
    .logo-container {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .logo-svg {
      width: 52px;
      height: 52px;
      filter: drop-shadow(0 6px 16px rgba(37, 99, 235, 0.3));
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .logo-svg:hover {
      transform: scale(1.08) translateY(-2px);
      filter: drop-shadow(0 8px 20px rgba(37, 99, 235, 0.4));
    }

    .logo-container.small .logo-svg {
      width: 36px;
      height: 36px;
    }

    .logo-container.large .logo-svg {
      width: 72px;
      height: 72px;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .logo-title {
      font-size: 28px;
      font-weight: 800;
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 70%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.8px;
      line-height: 1;
    }

    .logo-container.small .logo-title {
      font-size: 20px;
    }

    .logo-container.large .logo-title {
      font-size: 38px;
    }

    .logo-subtitle {
      font-size: 10px;
      color: #64748b;
      font-weight: 600;
      letter-spacing: 0.8px;
      margin-top: 2px;
      text-transform: uppercase;
    }
  `]
})
export class LogoComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showText: boolean = true;
}
