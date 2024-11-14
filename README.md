# Shorts

Shorts is an automatic video generator for TikTok/YouTube Shorts/Instagram. It streamlines the process of creating engaging short-form videos by automating content generation, script writing, and video rendering.

## Features

- **Automated Video Generation**: Convert text content into engaging short-form videos
- **Multi-Platform Support**: Generate videos optimized for TikTok, YouTube Shorts, and Instagram
- **AI-Powered Script Generation**: Utilizes Google's Gemini API for creative script writing
- **High-Quality Text-to-Speech**: Microsoft Edge TTS integration for natural-sounding voiceovers
- **Microservices Architecture**: Scalable and maintainable system design
- **Message Queue System**: Efficient task processing with RabbitMQ
- **Modern UI**: Responsive and intuitive interface built with React and shadcn/ui

## Video Types

Currently, the app supports two types of video generation:

1. **Crackbot Reaction** (`CRACKBOT_REACTION`)
   - Creates reaction-style videos with AI commentary
   - Features background video with synchronized subtitles
   - Supports custom voice selection
   - Automatically generates engaging reactions

2. **Crackbot Story** (`CRACKBOT_STORY`)
   - Generates storytelling-format videos
   - AI-powered narrative generation
   - Custom voice narration
   - Synchronized visual elements

## Architecture

The project follows a microservices architecture with the following components:

- **Frontend Web** (`/apps/frontend-web`): React-based user interface
- **Gateway** (`/apps/gateway`): API gateway service handling client requests
- **Renderer** (`/apps/renderer`): Video rendering service using Remotion
- **Script Generator** (`/apps/script-gen`): AI-powered content generation service

### Tech Stack

**Frontend:**
- React with TypeScript
- shadcn/ui for UI components
- Modern development tools (ESLint, Prettier)

**Backend:**
- Bun runtime for high performance
- Hono as the web framework
- SQLite for data persistence
- RabbitMQ for message queuing
- Docker for containerization
- Gemini API for AI content generation
- Microsoft Edge TTS for voice synthesis

## Prerequisites

- Docker and Docker Compose
- Bun runtime (latest version)
- Node.js 18+ (for development)
- Google Cloud API key (for Gemini API)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shorts.git
   cd shorts
   ```

2. Copy the example environment file and configure your settings:
   ```bash
   cp .env.example .env
   ```

3. Configure the following environment variables in `.env`:
   - `GOOGLE_API_KEY`: Your Google Cloud API key
   - Other necessary environment variables (refer to `.env.example`)

4. Install dependencies:
   ```bash
   bun install
   ```

## Development

Start the development server:
```bash
bun run dev
```

This will start all services in development mode with hot reloading.

## Production Deployment

1. Build the Docker containers:
   ```bash
   docker-compose build
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

## Project Structure

```
shorts/
├── apps/
│   ├── frontend-web/    # React frontend application
│   ├── gateway/         # API Gateway service
│   ├── renderer/        # Video rendering service
│   └── script-gen/      # Script generation service
├── packages/            # Shared packages and utilities
├── compose.yaml         # Docker Compose configuration
└── package.json         # Project configuration and scripts
```

## Available Scripts

- `bun run dev`: Start development server
- `bun run format`: Format code with Prettier
- `bun run lint`: Run ESLint
- `bun run test`: Run all tests
- `bun run test:apps`: Run tests for apps
- `bun run test:packages`: Run tests for shared packages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Schema synchronization between Frontend and Backend
- [ ] Additional video template types
- [ ] Framework upgrades (NestJS, Remix)
- [ ] Enhanced AI capabilities
- [ ] Performance optimizations

## Technical Details

### Message Queue System
RabbitMQ handles asynchronous communication between services:
- Video rendering requests
- Script generation tasks
- Status updates

### Database Schema
SQLite database stores:
- User data
- Video metadata
- Generation history
- System configurations

### API Gateway
The gateway service:
- Routes client requests
- Handles authentication
- Manages service discovery
- Implements rate limiting

### Video Rendering
Remotion handles:
- Frame-by-frame rendering
- Audio synchronization
- Video composition
- Export in multiple formats

## Troubleshooting

### Common Issues

1. **Docker Containers Not Starting**
   - Check Docker logs: `docker-compose logs`
   - Verify environment variables
   - Ensure ports are not in use

2. **Video Generation Failures**
   - Check RabbitMQ queue status
   - Verify Remotion configuration
   - Check system resources

3. **API Key Issues**
   - Verify Google Cloud API key is valid
   - Check API quota limits
   - Ensure proper environment variable setup

## License

This project is licensed under the Mozilla Public License Version 2.0 - see the [LICENSE](LICENSE) file for details.
