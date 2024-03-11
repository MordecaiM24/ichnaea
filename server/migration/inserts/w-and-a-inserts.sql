INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('William & Mary', 'William & Mary', 'w-and-a', 'Williamsburg, VA', 'Suburban', 1200, 41, 36.5, 6543, 46625, 19593, 'Public', 1375, 1460, 1520, 32, 33, 34);
-- Deadline 1 for William & Mary
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'William & Mary'), 'regularDecision', '2024-01-06T00:00:00.000Z', 'Regular Decision', '2024-02-02T00:00:00.000Z');
-- Deadline 2 for William & Mary
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'William & Mary'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision I', '2023-11-16T00:00:00.000Z');
-- Deadline 3 for William & Mary
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'William & Mary'), 'earlyDecision2', '2024-01-06T00:00:00.000Z', 'Early Decision II', '2024-01-16T00:00:00.000Z');
-- Supplemental Essay 1 for William & Mary
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'William & Mary'), 'To help W&M learn more about you, they invite you to share additional information by answering up to two of these optional short-answer prompts. Think of this optional opportunity as show and tell by proxy.', 0);
-- Supplemental Essay 2 for William & Mary
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'William & Mary'), '1. Beyond your impressive academic credentials and extracurricular accomplishments, what else makes you unique and colorful? ', 300);
-- Supplemental Essay 3 for William & Mary
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'William & Mary'), '2. Are there any particular communities that are important to you, and how do you see yourself being a part of our community?', 300);
-- Supplemental Essay 4 for William & Mary
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'William & Mary'), '3. How has your family, culture and/or background shaped your lived experience?', 300);
-- Supplemental Essay 5 for William & Mary
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'William & Mary'), '4. Share more about a personal academic interest or career goal.', 300);
-- Supplemental Essay 6 for William & Mary
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'William & Mary'), '5. Tell us about a challenge or adversity you’ve experienced and how that has impacted you as an individual.', 300);
-- Supplemental Essay 7 for William & Mary
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'William & Mary'), '6. If we visited your town, what would you want to show us?', 300);
