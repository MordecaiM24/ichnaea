INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Washington University (St. Louis)', 'Washington University', 'washingtonu', 'St. Louis, MO', 'City', 169, 15, 13, 8034, 60590, 26921, 'Private', 1480, 1520, 1560, 33, 34, 35);
-- Deadline 1 for Washington University (St. Louis)
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Washington University (St. Louis)'), 'earlyDecision', '2024-11-02T00:00:00.000Z', 'Early Decision I', '2023-11-16T00:00:00.000Z');
-- Deadline 2 for Washington University (St. Louis)
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Washington University (St. Louis)'), 'earlyDecision2', '2024-01-04T00:00:00.000Z', 'Early Decision II', '2024-01-13T00:00:00.000Z');
-- Supplemental Essay 1 for Washington University (St. Louis)
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Washington University (St. Louis)'), 'Discuss a fresh perspective or opinion you bring to a collaborative setting or project', 250);
-- Supplemental Essay 2 for Washington University (St. Louis)
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Washington University (St. Louis)'), 'Describe a community you are a part of and your place within it.', 250);
-- Supplemental Essay 3 for Washington University (St. Louis)
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Washington University (St. Louis)'), 'Tell us how your life experiences have impacted the way you view or interact with your community.', 250);
