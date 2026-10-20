import {NextResponse} from 'next/server';
import {getCurrentUser} from '../../../lib/auth';
import {query} from '../../../lib/db';

function asArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter(item => typeof item === 'string') : [];
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({preferences: null});
    const result = await query<{selected_categories: unknown; selected_goals: unknown; accessibility_preferences: unknown}>(
      'select selected_categories, selected_goals, accessibility_preferences from user_preferences where user_id=$1 limit 1',
      [user.id],
    );
    const row = result.rows[0];
    if (!row) return NextResponse.json({preferences: null});
    const extra = row.accessibility_preferences && typeof row.accessibility_preferences === 'object' ? row.accessibility_preferences as Record<string, unknown> : {};
    return NextResponse.json({preferences: {
      interests: asArray(row.selected_categories),
      goals: asArray(row.selected_goals),
      gender: typeof extra.gender === 'string' ? extra.gender : '',
      language: extra.language === 'en' ? 'en' : 'am',
      difficulty: typeof extra.difficulty === 'string' ? extra.difficulty : '',
      format: typeof extra.format === 'string' ? extra.format : '',
      customGoal: typeof extra.customGoal === 'string' ? extra.customGoal : '',
    }});
  } catch {
    return NextResponse.json({preferences: null});
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({error: 'Sign in required.'}, {status: 401});
    const body = await req.json();
    const interests = asArray(body.interests ?? body.categories);
    const goals = asArray(body.goals);
    const accessibility = {
      ...(body.accessibility && typeof body.accessibility === 'object' ? body.accessibility : {}),
      gender: typeof body.gender === 'string' ? body.gender : '',
      language: body.language === 'en' ? 'en' : 'am',
      difficulty: typeof body.difficulty === 'string' ? body.difficulty : '',
      format: typeof body.format === 'string' ? body.format : '',
      customGoal: typeof body.customGoal === 'string' ? body.customGoal.slice(0, 500) : '',
    };
    await query(
      'insert into user_preferences (user_id,selected_categories,selected_goals,accessibility_preferences) values ($1,$2,$3,$4) on conflict (user_id) do update set selected_categories=excluded.selected_categories,selected_goals=excluded.selected_goals,accessibility_preferences=excluded.accessibility_preferences,updated_at=now()',
      [user.id, JSON.stringify(interests), JSON.stringify(goals), JSON.stringify(accessibility)],
    );
    return NextResponse.json({ok: true, preferences: {interests, goals, ...accessibility}});
  } catch {
    return NextResponse.json({error: 'Preferences could not be saved.'}, {status: 503});
  }
}
