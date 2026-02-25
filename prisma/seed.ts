import 'dotenv/config';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  // Limpar dados existentes (ordem importa por causa das FK)
  await prisma.videoCastMember.deleteMany();
  await prisma.videoCategory.deleteMany();
  await prisma.video.deleteMany();
  await prisma.castMembers.deleteMany();
  await prisma.categories.deleteMany();
  await prisma.genres.deleteMany();

  // ==================== CATEGORIES ====================
  console.log('📂 Criando categorias...');
  const categories = await Promise.all([
    prisma.categories.create({
      data: {
        name: 'Ficção Científica',
      },
    }),
    prisma.categories.create({
      data: {
        name: 'Drama',
      },
    }),
    prisma.categories.create({
      data: {
        name: 'Ação',
      },
    }),
    prisma.categories.create({
      data: {
        name: 'Comédia',
      },
    }),
    prisma.categories.create({
      data: {
        name: 'Terror',
      },
    }),
  ]);

  // ==================== GENRES ====================
  console.log('🎬 Criando gêneros...');
  const genres = await Promise.all([
    prisma.genres.create({
      data: {
        name: 'Dublado',
      },
    }),
    prisma.genres.create({
      data: {
        name: 'Legendado',
      },
    }),
    prisma.genres.create({
      data: {
        name: 'Original',
      },
    }),
  ]);

  // ==================== CAST MEMBERS ====================
  console.log('👥 Criando atores...');
  const castMembers = await Promise.all([
    prisma.castMembers.create({
      data: {
        name: 'Leonardo DiCaprio',
      },
    }),
    prisma.castMembers.create({
      data: {
        name: 'Meryl Streep',
      },
    }),
    prisma.castMembers.create({
      data: {
        name: 'Tom Hanks',
      },
    }),
    prisma.castMembers.create({
      data: {
        name: 'Scarlett Johansson',
      },
    }),
    prisma.castMembers.create({
      data: {
        name: 'Ryan Gosling',
      },
    }),
  ]);

  // ==================== VIDEOS ====================
  console.log('🎥 Criando vídeos...');
  const videos = await Promise.all([
    prisma.video.create({
      data: {
        title: 'Interstellar',
        description:
          'Uma equipe de astronautas viaja através de um buraco de minhoca para salvar a humanidade.',
        release_year: 2014,
        duration_seconds: 10980,
        status: 'published',
      },
    }),
    prisma.video.create({
      data: {
        title: 'The Iron Lady',
        description:
          'A vida e carreira política de Margaret Thatcher, primeira-ministra do Reino Unido.',
        release_year: 2011,
        duration_seconds: 10560,
        status: 'published',
      },
    }),
    prisma.video.create({
      data: {
        title: 'Forrest Gump',
        description:
          'Uma história sobre um homem com baixo QI que presencia e participa em vários eventos históricos significativos.',
        release_year: 1994,
        duration_seconds: 8268,
        status: 'published',
      },
    }),
    prisma.video.create({
      data: {
        title: 'The Truman Show',
        description:
          'Um homem começa a suspeitar que sua realidade é um show de TV e que todos ao seu redor são atores.',
        release_year: 1998,
        duration_seconds: 6600,
        status: 'published',
      },
    }),
    prisma.video.create({
      data: {
        title: 'Insidious',
        description:
          'Uma família enfrenta uma entidade sobrenatural após seu filho cair em coma inexplicável.',
        release_year: 2010,
        duration_seconds: 6300,
        status: 'published',
      },
    }),
    prisma.video.create({
      data: {
        title: 'Novo Vídeo',
        description: 'Um novo vídeo ainda em processamento',
        release_year: 2025,
        duration_seconds: 3600,
        status: 'processing',
      },
    }),
  ]);

  // ==================== VIDEO CATEGORIES ====================
  console.log('🏷️  Associando categorias aos vídeos...');
  await Promise.all([
    // Interstellar - Ficção Científica
    prisma.videoCategory.create({
      data: {
        video_id: videos[0].id,
        category_id: categories[0].id,
      },
    }),
    // The Iron Lady - Drama
    prisma.videoCategory.create({
      data: {
        video_id: videos[1].id,
        category_id: categories[1].id,
      },
    }),
    // Forrest Gump - Drama, Comédia
    prisma.videoCategory.create({
      data: {
        video_id: videos[2].id,
        category_id: categories[1].id,
      },
    }),
    prisma.videoCategory.create({
      data: {
        video_id: videos[2].id,
        category_id: categories[3].id,
      },
    }),
    // The Truman Show - Comédia
    prisma.videoCategory.create({
      data: {
        video_id: videos[3].id,
        category_id: categories[3].id,
      },
    }),
    // Insidious - Terror
    prisma.videoCategory.create({
      data: {
        video_id: videos[4].id,
        category_id: categories[4].id,
      },
    }),
    // Novo Vídeo - Ficção Científica
    prisma.videoCategory.create({
      data: {
        video_id: videos[5].id,
        category_id: categories[0].id,
      },
    }),
  ]);

  // ==================== VIDEO CAST MEMBERS ====================
  console.log('🎭 Associando atores aos vídeos...');
  await Promise.all([
    // Interstellar - Leonardo DiCaprio, Meryl Streep
    prisma.videoCastMember.create({
      data: {
        video_id: videos[0].id,
        cast_member_id: castMembers[0].id,
      },
    }),
    prisma.videoCastMember.create({
      data: {
        video_id: videos[0].id,
        cast_member_id: castMembers[1].id,
      },
    }),
    // The Iron Lady - Meryl Streep
    prisma.videoCastMember.create({
      data: {
        video_id: videos[1].id,
        cast_member_id: castMembers[1].id,
      },
    }),
    // Forrest Gump - Tom Hanks
    prisma.videoCastMember.create({
      data: {
        video_id: videos[2].id,
        cast_member_id: castMembers[2].id,
      },
    }),
    // The Truman Show - Jim Carrey (Ryan Gosling para este exemplo)
    prisma.videoCastMember.create({
      data: {
        video_id: videos[3].id,
        cast_member_id: castMembers[4].id,
      },
    }),
    // Insidious - Scarlett Johansson
    prisma.videoCastMember.create({
      data: {
        video_id: videos[4].id,
        cast_member_id: castMembers[3].id,
      },
    }),
    // Novo Vídeo - Leonardo DiCaprio, Ryan Gosling
    prisma.videoCastMember.create({
      data: {
        video_id: videos[5].id,
        cast_member_id: castMembers[0].id,
      },
    }),
    prisma.videoCastMember.create({
      data: {
        video_id: videos[5].id,
        cast_member_id: castMembers[4].id,
      },
    }),
  ]);

  console.log('\n✅ Seed concluído com sucesso!\n');
  console.log('📊 Resumo:');
  console.log(`   - ${categories.length} categorias`);
  console.log(`   - ${genres.length} gêneros`);
  console.log(`   - ${castMembers.length} atores`);
  console.log(`   - ${videos.length} vídeos`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error('❌ Erro durante seed:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
